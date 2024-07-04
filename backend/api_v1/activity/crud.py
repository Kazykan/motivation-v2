from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Activity, Week
from sqlalchemy.engine import Result
from sqlalchemy import select
from sqlalchemy.orm import selectinload


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
    transfer_in: ActivityCreate,
) -> Activity:
    transfer = Activity(**transfer_in.model_dump())
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
        week_day = await session.scalar(
            select(Week)
            .where(Week.id == week_id)
            .options(
                selectinload(Week.activities),
            ),
        )
        # Проверяем наличие дня недели
        if week_day is not None:
            if add:
                week_day.activities.append(activity)
            else:
                week_day.activities.remove(activity)
            await session.commit()
            activity = await get_activity_by_id(session, activity_id)
            return activity
    return None


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
