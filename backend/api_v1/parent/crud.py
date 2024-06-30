from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Parent
from sqlalchemy.engine import Result
from sqlalchemy import select

from .schemas import ParentCreate, ParentUpdate, ParentUpdatePartial


async def get_parents(session: AsyncSession) -> list[Parent]:
    stmt = select(Parent).order_by(Parent.id)
    result: Result = await session.execute(stmt)
    parents = result.scalars().all()
    return list(parents)


async def get_parent_by_bot_user_id(
    session: AsyncSession,
    bot_user_id: int,
) -> Parent | None:
    """Ищем родителя по его bot_user_id"""
    return await session.get(Parent, bot_user_id)


async def get_parent(
    session: AsyncSession,
    parent_id: int,
) -> Parent | None:
    return await session.get(Parent, parent_id)


async def create_parent(
    session: AsyncSession,
    parent_in: ParentCreate,
) -> Parent:
    parent = Parent(**parent_in.model_dump())
    session.add(parent)
    await session.commit()
    return parent


async def update_parent(
    session: AsyncSession,
    parent: Parent,
    parent_update: ParentUpdate | ParentUpdatePartial,
    partial: bool = False,
) -> Parent:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in parent_update.model_dump(exclude_unset=partial).items():
        setattr(parent, name, value)
    await session.commit()
    return parent


async def delete_parent(
    session: AsyncSession,
    parent: Parent,
) -> None:
    await session.delete(parent)
    await session.commit()
