from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Parent, Child
from sqlalchemy.engine import Result
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from .schemas import ParentCreate, ParentUpdate, ParentUpdatePartial, ParentSchema


async def get_parents(session: AsyncSession) -> list[ParentSchema]:
    stmt = select(Parent).options(selectinload(Parent.children)).order_by(Parent.id)
    result: Result = await session.execute(stmt)
    parents = result.scalars().all()
    return list(parents)


async def get_parent_by_bot_user_id(
    session: AsyncSession,
    bot_user_id: int,
) -> ParentSchema | None:
    """Ищем родителя по его bot_user_id"""
    stmt = (
        select(Parent)
        .where(Parent.bot_user_id == bot_user_id)
        .options(selectinload(Parent.children))
    )
    result: Result = await session.execute(stmt)
    parent = result.scalars().one_or_none()
    return parent


async def get_parent_by_phone_number(
    session: AsyncSession,
    phone_number: str,
) -> ParentSchema | None:
    stmt = (
        select(Parent)
        .where(Parent.phone.like(phone_number))
        .options(selectinload(Parent.children))
    )
    result: Result = await session.execute(stmt)
    parent = result.scalars().one_or_none()
    return parent


async def get_parent_by_id(
    session: AsyncSession,
    parent_id: int,
) -> ParentSchema | None:
    stmt = (
        select(Parent)
        .where(Parent.id == parent_id)
        .options(
            selectinload(Parent.children),
        )
    )
    result: Result = await session.execute(stmt)
    parent = result.scalars().one_or_none()
    return parent


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


async def add_parent_child_relationship(
    session: AsyncSession,
    parent_id: int,
    child_id: int,
    add: bool = True,
):
    parent = await session.get(Parent, parent_id)
    # Проверяем наличие активности
    if parent is not None:
        # Получаем данные по дню недели
        child = await session.scalars(
            select(Child)
            .where(Child.id == child_id)
            .options(
                selectinload(Child.parents),
            ),
        )
        # Проверяем наличие дня недели
        if child is not None:
            child_first = child.first()
            if add:
                child_first.parents.append(parent)
            else:
                child_first.parents.remove(parent)
            await session.commit()
            parent = await get_activity_by_id(session, parent_id)
            return parent
    return None
