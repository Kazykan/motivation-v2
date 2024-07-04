from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    Activity,
    ActivityCreate,
    ActivitySchema,
    ActivityUpdate,
    ActivityUpdatePartial,
)
from . import crud
from .dependencies import activity_by_id
from core.models import db_helper

router = APIRouter(tags=["Activities"])


@router.get("/", response_model=list[Activity])
async def get_activities(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    child_id: int | None = None,
):
    if child_id is not None:
        activities = await crud.get_activity_filters(
            session=session,
            child_id=child_id,
        )
        if activities is not None:
            return activities

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Child {child_id} not found!",
        )
    else:
        return await crud.get_transfers(session=session)


@router.post(
    "/",
    response_model=Activity,
    status_code=status.HTTP_201_CREATED,
)
async def create_transfer(
    transfer_in: ActivityCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_activity(
        session=session,
        transfer_in=transfer_in,
    )


@router.post(
    "/add_week_day",
    response_model=ActivitySchema,
    status_code=status.HTTP_201_CREATED,
)
async def add_activity_week_day_relationship(
    activity_id: int,
    week_id: int,
    add: bool = True,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    result = await crud.add_activity_week_relationship(
        session=session,
        activity_id=activity_id,
        week_id=week_id,
        add=add,
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Activity {activity_id} not found!",
        )
    return result


@router.get("/{activity_id}/", response_model=ActivitySchema)
async def get_activity_by_id(
    activity_id: int,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    activity = await crud.get_activity_by_id(
        session=session,
        activity_id=activity_id,
    )
    if activity is not None:
        return activity

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Activity {activity_id} not found!",
    )


@router.put("/{transfer_id}/")
async def update_transfer(
    transfer_update: ActivityUpdate,
    transfer: Activity = Depends(activity_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_activity(
        session=session, transfer=transfer, transfer_update=transfer_update
    )


@router.patch("/{transfer_id}/")
async def update_transfer_partial(
    transfer_update: ActivityUpdatePartial,
    transfer: Activity = Depends(activity_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_activity(
        session=session,
        transfer=transfer,
        transfer_update=transfer_update,
        partial=True,
    )


@router.delete("/{transfer_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_transfer(
    transfer: Activity = Depends(activity_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_activity(session=session, transfer=transfer)
