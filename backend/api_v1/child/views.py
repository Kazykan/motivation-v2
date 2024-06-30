from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import Child, ChildCreate, ChildUpdate, ChildUpdatePartial
from . import crud
from .dependencies import child_by_id
from core.models import db_helper

router = APIRouter(tags=["Children"])


# @router.get("/", response_model=list[Child])
# async def get_child(
#     session: AsyncSession = Depends(db_helper.scoped_session_dependency),
#     parent_id: int | None = None,
# ):
#     if parent_id is not None:
#         expense = await crud.get_children_by_parent_id(
#             session=session,
#             parent_id=parent_id,
#         )
#         if expense is not None:
#             return expense

#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Child {parent_id} not found!",
#         )
#     else:
#         return await crud.get_children(session=session)


@router.get("/", response_model=list[Child])
async def get_child(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    child_id: int | None = None,
    phone_number: str | None = None,
    bot_user_id: int | None = None,
):
    if child_id is not None:
        child = await crud.get_child(session=session, child_id=child_id)
        if child is not None:
            return child

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Child {child_id} not found!",
        )
    if phone_number is not None:
        child = await crud.get_child_by_phone_number(
            session=session,
            phone_number=phone_number,
        )
        if child is not None:
            return child

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Child {phone_number} not found!",
        )
    if bot_user_id is not None:
        child = await crud.get_child_by_bot_user_id(
            session=session,
            bot_user_id=bot_user_id,
        )
        if child is not None:
            return child

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Child bot user id -> {bot_user_id} not found!",
        )
    return await crud.get_children(session=session)


@router.post(
    "/",
    response_model=Child,
    status_code=status.HTTP_201_CREATED,
)
async def create_expense(
    child_in: ChildCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_child(
        session=session,
        child_in=child_in,
    )


@router.post(
    "/child_parents",
    response_model=Child,
    status_code=status.HTTP_201_CREATED,
)
async def add_child_parents_relationship(
    child_id: int,
    parents_ids: list[int],
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.add_child_parents_relationship(
        session=session,
        child_id=child_id,
        parents_ids=parents_ids,
    )


@router.put("/{child_id}/")
async def update_child(
    child_update: ChildUpdate,
    child: Child = Depends(child_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_children(
        session=session, child=child, child_update=child_update
    )


@router.patch("/{child_id}/")
async def update_expense_partial(
    expense_update: ChildUpdatePartial,
    expense: Child = Depends(child_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_children(
        session=session,
        child=expense,
        child_update=expense_update,
        partial=True,
    )


@router.delete("/{expense_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    expense: Child = Depends(child_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_expense(session=session, expense=expense)
