from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import Child, ChildCreate, ChildUpdate, ChildUpdatePartial
from . import crud
from .dependencies import child_by_id
from core.models import db_helper

router = APIRouter(tags=["Children"])


@router.get("/", response_model=list[Child] | Child)
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
            detail=f"Child number {phone_number} not found!",
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


# @router.get("/{child_id}", response_model=ChildSchema)
# async def get_child_by_id(
#     child_id: int,
#     session: AsyncSession = Depends(db_helper.scoped_session_dependency),
# ):
#     child = await crud.get_child_with_parents(
#         session=session,
#         child_id=child_id,
#     )
#     if child is not None:
#         return child


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
    "/add_child_parent",
    response_model=Child,
    status_code=status.HTTP_201_CREATED,
)
async def add_child_parent_relationship(
    child_id: int,
    parent_id: int,
    add: bool = True,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    result = await crud.add_child_parent_relationship(
        session=session,
        child_id=child_id,
        parent_id=parent_id,
        add=add,
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Child {child_id} not found!",
        )
    return result


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
