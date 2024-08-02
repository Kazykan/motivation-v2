from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Child, Parent, child_mtm_parent
from sqlalchemy.engine import Result
from sqlalchemy import select, and_
from sqlalchemy.orm import selectinload

from .schemas import ChildCreate, ChildUpdate, ChildUpdatePartial


async def get_children(session: AsyncSession) -> list[Child]:
    stmt = (
        select(Child)
        .options(
            selectinload(Child.parents),
        )
        .order_by(Child.id)
    )
    children = await session.scalars(stmt)
    return list(children)


async def get_children_by_parent_id(
    session: AsyncSession,
    parent_id: int | None = None,
) -> list[Child] | None:
    """Ищем детей по полю parent_id"""
    stmt = select(Child)
    stmt = stmt.where(
        and_(
            Parent.id == parent_id,
            Parent.id == child_mtm_parent.c.parent_id,
            Child.id == child_mtm_parent.c.child_id,
        )
    )
    result: Result = await session.execute(stmt)
    children = result.scalars().all()
    return list(children)


async def get_child_by_id(
    session: AsyncSession,
    child_id: int,
) -> Child | None:
    stmt = (
        select(Child)
        .where(Child.id == child_id)
        .options(selectinload(Child.parents),)
    )
    result: Result = await session.execute(stmt)
    child = result.scalars().one_or_none()
    return child


async def get_child_by_bot_user_id(
    session: AsyncSession,
    bot_user_id: int,
) -> Child | None:
    stmt = (
        select(Child)
        .where(Child.bot_user_id == bot_user_id)
        .options(selectinload(Child.parents))
    )
    result: Result = await session.execute(stmt)
    child = result.scalars().one_or_none()
    return child


async def get_child_by_phone_number(
    session: AsyncSession,
    phone_number: str,
) -> Child | None:
    result: Result = await session.execute(
        select(Child).filter(Child.phone.like(phone_number))
    )
    return result.scalar_one_or_none()


async def get_child_with_parents(
    session: AsyncSession,
    child_id: int,
) -> Child | None:
    stmt = (
        select(Child)
        .where(Child.id == child_id)
        .options(
            selectinload(Child.parents),
        )
    )
    result: Result = await session.execute(stmt)
    child = result.scalars().first()
    return child


async def create_child(
    session: AsyncSession,
    child_in: ChildCreate,
) -> Child:
    child = Child(**child_in.model_dump())
    session.add(child)
    await session.commit()
    return child


async def add_child_parent_relationship(
    session: AsyncSession,
    child_id: int,
    parent_id: int,
    add: bool = True,
):
    child = await session.get(Child, child_id)
    # проверка наличия ребенка
    if child is not None:
        # Получаем данные
        parent = await session.scalar(
            select(Parent)
            .where(Parent.id == parent_id)
            .options(
                selectinload(Parent.children),
            ),
        )
        # Проверяем наличие дня недели
        if parent is not None:
            if add:
                parent.children.append(child)
            else:
                parent.children.remove(child)
            await session.commit()
            child = await get_child_with_parents(session, child_id)
            return child
    return None


async def update_children(
    session: AsyncSession,
    child: Child,
    child_update: ChildUpdate | ChildUpdatePartial,
    partial: bool = False,
) -> Child:
    """Делаем либо частичное обновление либо полное в зависимости от partial"""
    for name, value in child_update.model_dump(exclude_unset=partial).items():
        setattr(child, name, value)
    await session.commit()
    return child


async def delete_child(
    session: AsyncSession,
    child: Child,
) -> None:
    await session.delete(child)
    await session.commit()
