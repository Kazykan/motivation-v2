from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Week
from sqlalchemy.engine import Result
from sqlalchemy import select

from .schemas import WeekCreate


async def get_webAppUsers(session: AsyncSession) -> list[Week]:
    stmt = select(Week).order_by(Week.id)
    result: Result = await session.execute(stmt)
    products = result.scalars().all()
    return list(products)


async def get_week_days_by_activity_id(
    session: AsyncSession,
    activity_id: int,
) -> list[Week] | None:
    """Ищем пользователя по полю telegram_user_id"""
    stmt = select(Week).where(Week.activities.id == activity_id)
    result: Result = await session.execute(stmt)
    # webAppUser = result.scalar_one_or_none()
    week_day = result.scalars().all()
    return week_day


async def get_week_day(
    session: AsyncSession,
    week_id: int,
) -> Week | None:
    return await session.get(Week, week_id)


async def create_week_day(
    session: AsyncSession,
    week_day_in: WeekCreate,
) -> Week:
    week_day = Week(**week_day_in.model_dump())
    session.add(week_day)
    await session.commit()
    return week_day


async def delete_week_day(
    session: AsyncSession,
    week_day: Week,
) -> None:
    await session.delete(week_day)
    await session.commit()
