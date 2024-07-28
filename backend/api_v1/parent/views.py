from fastapi import APIRouter, HTTPException, status, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    Parent,
    ParentCreate,
    ParentSchema,
    ParentUpdatePartial,
)
from . import crud
from .dependencies import parent_by_id
from core.models import db_helper

router = APIRouter(tags=["Parents"])


@router.get("/", response_model=list[ParentSchema] | ParentSchema)
async def get_parent(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    parent_id: int | None = None,
    phone_number: str | None = None,
    bot_user_id: int | None = None,
):
    if parent_id is not None:
        parent = await crud.get_parent_by_id(
            session=session,
            parent_id=parent_id,
        )
        if parent is not None:
            return parent

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Parent {parent_id} not found!",
        )
    if phone_number is not None:
        child = await crud.get_parent_by_phone_number(
            session=session,
            phone_number=phone_number,
        )
        if child is not None:
            return child

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Parent number {phone_number} not found!",
        )

    if bot_user_id is not None:
        parent = await crud.get_parent_by_bot_user_id(
            session=session,
            bot_user_id=bot_user_id,
        )
        if parent is not None:
            return parent

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Parent {bot_user_id} not found!",
        )

    return await crud.get_parents(session=session)


@router.post(
    "/",
    response_model=Parent,
    status_code=status.HTTP_201_CREATED,
)
async def create_parent(
    parent_in: ParentCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_parent(
        session=session,
        parent_in=parent_in,
    )


@router.post(
    "/add_child",
    response_model=ParentSchema,
    status_code=status.HTTP_201_CREATED,
)
async def add_parent_child_relationship(
    parent_id: int,
    child_id: int,
    add: bool = True,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    result = await crud.add_parent_child_relationship(
        session=session,
        parent_id=parent_id,
        child_id=child_id,
        add=add,
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Parent {parent_id} or Child {child_id} not found!",
        )
    return result


@router.patch("/{parent_id}/")
async def update_parent_partial(
    parent_update: ParentUpdatePartial,
    parent: Parent = Depends(parent_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_parent(
        session=session,
        parent=parent,
        parent_update=parent_update,
        partial=True,
    )


@router.delete("/{parent_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_parent(
    parent: Parent = Depends(parent_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_parent(session=session, parent=parent)
