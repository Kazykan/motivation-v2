import datetime, math
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from api_v1.activity_day.crud import (
    editor_activity_day_next_week,
    get_activity_days_between_date,
)
from api_v1.child.crud import get_children
from core.models import Activity, Week, Activity_day, activity_mtm_week
from sqlalchemy.engine import Result
from sqlalchemy import select, and_
from sqlalchemy.orm import selectinload


from .schemas import (
    ActivityCreate,
    ActivityUpdate,
    ActivityUpdatePartial,
)


async def get_activities(session: AsyncSession) -> list[Activity]:
    stmt = select(Activity).order_by(Activity.id)
    result: Result = await session.execute(stmt)
    activities = result.scalars().all()
    return list(activities)


async def get_activity_filters(
    session: AsyncSession,
    child_id: int | None,
) -> list[Activity] | None:
    """Получение активностей по id ребенка"""
    stmt = select(Activity)
    if child_id is not None:
        stmt = stmt.where(Activity.child_id == child_id)
    result: Result = await session.execute(stmt)
    activity = result.scalars().all()
    return list(activity)


async def get_sum_done_activities(
    session: AsyncSession,
    child_id: int,
    day_start: datetime.date,
    day_end: datetime.date,
):
    stmt = select(Activity).where(Activity.child_id == child_id)
    result: Result = await session.execute(stmt)
    activities = result.scalars().all()
    if len(activities) == 0:
        return 0
    total_sum = 0
    for activity in activities:
        stmt_activity_all = select(Activity_day).where(
            and_(
                Activity_day.activity_id == activity.id,
                Activity_day.day.between(day_start, day_end),
            )
        )
        result_all: Result = await session.execute(stmt_activity_all)
        activ_days = len(result_all.scalars().all())

        stmt_activity_done = select(Activity_day).where(
            and_(
                Activity_day.activity_id == activity.id,
                Activity_day.is_done == True,
                Activity_day.day.between(day_start, day_end),
            )
        )
        result_done: Result = await session.execute(stmt_activity_done)
        activ_days_done = len(result_done.scalars().all())
        if activ_days_done == 0 or activ_days == 0:
            continue
        else:
            total_sum += math.ceil(activity.cost / activ_days * activ_days_done)
    return total_sum


async def get_activity(
    session: AsyncSession,
    activity_id: int,
) -> Activity | None:
    return await session.get(Activity, activity_id)


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


async def create_activity(
    session: AsyncSession,
    activity_in: ActivityCreate,
) -> Activity:
    transfer = Activity(**activity_in.model_dump())
    session.add(transfer)
    await session.commit()
    return transfer


async def add_activity_week_relationship(
    session: AsyncSession,
    activity_id: int,
    week_id: int,
    add: bool = True,
):
    activity = await session.get(Activity, activity_id)
    # Проверяем наличие активности
    if activity is not None:
        # Получаем данные по дню недели
        week_day = await session.scalars(
            select(Week)
            .where(Week.id == week_id)
            .options(
                selectinload(Week.activities),
            ),
        )
        # Проверяем наличие дня недели
        if week_day is not None:
            week_day_first = week_day.first()
            if add:
                week_day_first.activities.append(activity)
            else:
                week_day_first.activities.remove(activity)
            await session.commit()
            activity = await get_activity_by_id(session, activity_id)
            return activity
    return None


async def update_activity(
    session: AsyncSession,
    activity: Activity,
    activity_update: ActivityUpdate | ActivityUpdatePartial,
    partial: bool = False,
) -> Activity:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in activity_update.model_dump(exclude_unset=partial).items():
        setattr(activity, name, value)
    await session.commit()
    return activity


async def delete_activity(
    session: AsyncSession,
    activity: Activity,
) -> None:
    await session.delete(activity)
    await session.commit()


async def get_activity_with_day_of_week(
    session: AsyncSession, activity_id: int, week_id: int
) -> Activity | None:
    stmt = select(Activity).where(
        and_(
            Activity.id == activity_id,
            Week.id == week_id,
            Activity.id == activity_mtm_week.c.activity_id,
            Week.id == activity_mtm_week.c.week_id,
        )
    )
    result: Result = await session.execute(stmt)
    activity: Activity | None = result.scalars().one_or_none()
    return activity


async def update_all_activity_all_children_in_period(
        session: AsyncSession,
) -> str:
    """Обновляем все активности всех детей"""
    result_text = ""
    children = await get_children(session=session)
    if len(children) == 0:
        return "No children found\n"
    else:
        for child in children:
            result_text += await update_all_activity_days_in_period(session=session, child_id=child.id)
        return result_text

async def update_all_activity_days_in_period(
    session: AsyncSession,
    child_id: int,
) -> str:
    """Находим все активности ребенка"""
    result_text = ""
    today = datetime.datetime.today()
    next_monday = today + datetime.timedelta(days=(7 - today.weekday() or 7))
    next_2_week_sunday = next_monday + datetime.timedelta(days=(13))
    activities: List[Activity] = await get_activity_filters(
        session=session, child_id=child_id
    )
    if len(activities) > 0:
        for activity in activities:
            activity_with_weeks = await get_activity_by_id(
                session=session, activity_id=activity.id
            )
            week_days: list[int] = []
            result_text += f"Activity - {activity.name} {next_monday.date()} - {next_2_week_sunday.date()}\n"
            for week in activity_with_weeks.weeks:
                result_text += f"  - w {week.week_day} - {week.id}\n"
                week_days.append(week.id)
            temp = await editor_activity_day_next_week(
                session=session,
                activity_id=activity.id,
                day_start=next_monday.date(),
                day_end=next_2_week_sunday.date(),
                week_days=week_days,
            )
            result_text += f"{temp}"
    return result_text
