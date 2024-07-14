import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Activity_day
from sqlalchemy.engine import Result
from sqlalchemy import and_, select

from .schemas import ActivityDayCreate, ActivityDayUpdate, ActivityDayUpdatePartial


async def get_activity_days(session: AsyncSession) -> list[Activity_day]:
    stmt = select(Activity_day).order_by(Activity_day.id)
    result: Result = await session.execute(stmt)
    activity_days = result.scalars().all()
    return list(activity_days)


async def get_activity_days_between_date(
    session: AsyncSession,
    activity_id: int,
    day_start: datetime.date | None,
    day_end: datetime.date | None,
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
    session.add(activity_day)
    await session.commit()
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


async def delete_activity_day(
    session: AsyncSession,
    activity_day: Activity_day,
) -> None:
    await session.delete(activity_day)
    await session.commit()
