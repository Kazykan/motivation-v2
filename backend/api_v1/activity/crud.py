from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Activity
from sqlalchemy.engine import Result
from sqlalchemy import select

from .schemas import (
    ActivityCreate,
    ActivityUpdate,
    ActivityUpdatePartial,
)


async def get_transfers(session: AsyncSession) -> list[Activity]:
    stmt = select(Activity).order_by(Activity.id)
    result: Result = await session.execute(stmt)
    products = result.scalars().all()
    return list(products)


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


async def get_activity(
    session: AsyncSession,
    activity_id: int,
) -> Activity | None:
    return await session.get(Activity, activity_id)


async def create_activity(
    session: AsyncSession,
    transfer_in: ActivityCreate,
) -> Activity:
    transfer = Activity(**transfer_in.model_dump())
    session.add(transfer)
    await session.commit()
    return transfer


async def update_activity(
    session: AsyncSession,
    transfer: Activity,
    transfer_update: ActivityUpdate | ActivityUpdatePartial,
    partial: bool = False,
) -> Activity:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in transfer_update.model_dump(exclude_unset=partial).items():
        setattr(transfer, name, value)
    await session.commit()
    return transfer


async def delete_activity(
    session: AsyncSession,
    transfer: Activity,
) -> None:
    await session.delete(transfer)
    await session.commit()
