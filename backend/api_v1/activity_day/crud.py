from datetime import datetime, date, timedelta
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Activity_day, Week, Activity
from sqlalchemy.engine import Result
from sqlalchemy import and_, select
from sqlalchemy.orm import selectinload

from .schemas import ActivityDayCreate, ActivityDayUpdate, ActivityDayUpdatePartial


async def get_activity_by_id(
    session: AsyncSession,
    activity_id: int,
) -> Activity | None:
    stmt = (
        select(Activity)
        .where(Activity.id == activity_id)
        .options(
            selectinload(Activity.weeks),
        )
        .order_by(Activity.id)
    )
    result: Result = await session.execute(stmt)
    activity = result.scalars().first()
    return activity


async def get_activity_days(session: AsyncSession) -> list[Activity_day]:
    stmt = select(Activity_day).order_by(Activity_day.id)
    result: Result = await session.execute(stmt)
    activity_days = result.scalars().all()
    return list(activity_days)


async def get_activity_days_between_date(
    session: AsyncSession,
    activity_id: int,
    day_start: date | None,
    day_end: date | None,
) -> list[Activity_day] | None:
    """Ищем Activity_day по полю activity_id и диапазону дат"""
    if day_start is not None and day_end is not None:
        stmt = select(Activity_day).where(
            and_(
                Activity_day.activity_id == activity_id,
                Activity_day.day.between(day_start, day_end),
            )
        )
    else:
        stmt = select(Activity_day).where(
            Activity_day.activity_id == activity_id,
        )
    result: Result = await session.execute(stmt)
    activity_day = result.scalars().all()
    return list(activity_day)


async def get_activity_day(
    session: AsyncSession,
    id: int,
) -> Activity_day | None:
    return await session.get(Activity_day, id)


async def create_activity_day(
    session: AsyncSession,
    activity_day_in: ActivityDayCreate,
) -> Activity_day:
    activity_day = Activity_day(**activity_day_in.model_dump())
    try:
        session.add(activity_day)
        activity = await session.get(Activity, activity_day.activity_id)
        # Проверяем наличие активности
        if activity is not None:
            # Получаем данные по дню недели
            week_day = await session.scalars(
                select(Week)
                .where(Week.id == date.isoweekday(activity_day.day))
                .options(
                    selectinload(Week.activities),
                ),
            )
            # Проверяем наличие дня недели
            week_day_check = await session.scalars(
                select(Week).where(
                    Week.id == date.isoweekday(activity_day.day),
                    Week.activities.any(Activity.id == activity_day.activity_id),
                )
            )
            # Проверяем наличие дня недели
            if week_day is not None and week_day_check.one_or_none() is None:
                week_day_first = week_day.first()
                week_day_first.activities.append(activity)
    except:
        session.rollback()
        return False
    else:
        await session.commit()
        await update_one_activity_days_in_period(session=session, activity_id=activity_day.activity_id)
        return activity_day


async def update_activity_day(
    session: AsyncSession,
    activity_day: Activity_day,
    activity_day_update: ActivityDayUpdate | ActivityDayUpdatePartial,
    partial: bool = False,
) -> Activity_day:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in activity_day_update.model_dump(exclude_unset=partial).items():
        setattr(activity_day, name, value)
    await session.commit()
    return activity_day


async def update_one_activity_days_in_period(
    session: AsyncSession,
    activity_id: int,
) -> str:
    """Находим все активности ребенка"""
    result_text = ""
    today = datetime.today()
    next_monday = today + timedelta(days=(7 - today.weekday() or 7))
    next_2_week_sunday = next_monday + timedelta(days=(13))

    activity_with_weeks = await get_activity_by_id(
        session=session, activity_id=activity_id
    )
    week_days: list[int] = []
    for week in activity_with_weeks.weeks:
        result_text += f"  - w {week.week_day} - {week.id}\n"
        week_days.append(week.id)
    temp = await editor_activity_day_next_week(
        session=session,
        activity_id=activity_id,
        day_start=next_monday.date(),
        day_end=next_2_week_sunday.date(),
        week_days=week_days,
    )
    result_text += f"next_monday - {next_monday.date()} - next_2_week_sunday {next_2_week_sunday.date()}\n"
    result_text += f"{temp}"
    return result_text


async def delete_activity_day(
    session: AsyncSession,
    activity_day: Activity_day,
) -> None:
    try:  # Пробуем удалить задание на день и привязку активности к дню недели
        await session.delete(activity_day)
        activity = await session.get(Activity, activity_day.activity_id)
        # Проверяем наличие активности
        if activity is not None:
            # Получаем данные по дню недели
            week_day = await session.scalars(
                select(Week)
                .where(Week.id == date.isoweekday(activity_day.day))
                .options(
                    selectinload(Week.activities),
                ),
            )
            # Проверяем наличие дня недели
            week_day_check = await session.scalars(
                select(Week).where(
                    Week.id == date.isoweekday(activity_day.day),
                    Week.activities.any(Activity.id == activity_day.activity_id),
                )
            )
            # Проверяем наличие дня недели
            if week_day is not None and week_day_check.one_or_none() is not None:
                week_day_first = week_day.first()
                week_day_first.activities.remove(activity)
    except:  # Если не успешно откатываем изменения
        session.rollback()
        return False
    else:  # Если успешно записываем в бд
        await session.commit()
        await update_one_activity_days_in_period(session=session, activity_id=activity_day.activity_id)
        return True


async def date_comparison_cycle(
    activity_days: List[Activity_day] | None,
    current_day: date
) -> bool:
    # text = "----- date_comparison_cycle ----- \n"
    for day in activity_days:
        # text += f"  - {day.day} - {current_day}\n"
        if day.day == current_day: # Смотрим добавлен он или нет
            # text += "True \n"
            # return text
            return True
    # return text + "False \n"
    return False


async def editor_activity_day_next_week(
    session: AsyncSession,
    activity_id: int,
    day_start: date,
    day_end: date,
    week_days: list[int],
) -> bool:
    """Актуализирование и продление заданий на 2 следующие недели"""
    temp = "? "
    activity_days: List[Activity_day] | None = await get_activity_days_between_date(
        session=session,
        activity_id=activity_id,
        day_start=day_start,
        day_end=day_end,
    )
    temp = f"week days: {week_days}\n"
    current_day = day_start
    while (current_day <= day_end):
        # Если этот день есть в списке дней недели
        if current_day.isoweekday() in week_days:
            is_day = await date_comparison_cycle(activity_days=activity_days, current_day=current_day)
            # temp += is_day
            if is_day is False:
                temp += f"Не нашли день добавляем в БД {datetime.strftime(current_day, "%Y-%m-%d")}\n"
                activity_day = Activity_day(day=current_day, activity_id=activity_id)
                session.add(activity_day)
                await session.commit()
            else:
                temp += f"Нашил день и ничего не делаем {datetime.strftime(current_day, "%Y-%m-%d")}\n"
        else:
            for day in activity_days:
                if day.day == current_day:
                    await session.delete(day)
                    await session.commit()
                    temp += f"Нашли, но его нет в weeks удаляем - {datetime.strftime(current_day, "%Y-%m-%d")} activ_id: {day.id}\n"
        current_day += timedelta(days=1)
    return temp
