from fastapi import APIRouter, HTTPException, status, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    Parent,
    ParentCreate,
    ParentUpdate,
    ParentUpdatePartial,
)
from . import crud
from .dependencies import parent_by_id
from core.models import db_helper

router = APIRouter(tags=["Parents"])


@router.get("/", response_model=list[Parent])
async def get_parents(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_parents(session=session)


@router.get("/bot_user_id/{bot_user_id}/", response_model=Parent)
async def get_parent_by_bot_user_id(
    bot_user_id: int,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Parent | None:
    parent = await crud.get_parent_by_bot_user_id(
        session=session, bot_user_id=bot_user_id
    )
    if parent is not None:
        return parent

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Parent {bot_user_id} not found!",
    )


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
