import datetime
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    ActivityDay,
    ActivityDayCreate,
    ActivityDayUpdate,
    ActivityDayUpdatePartial,
)
from . import crud
from .dependencies import activity_day_by_id
from core.models import db_helper

router = APIRouter(tags=["Activity days"])


@router.get("/", response_model=list[ActivityDay])
async def get_activity_days(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    activity_id: int | None = None,
    day_start: datetime.date | None = None,
    day_end: datetime.date | None = None,
):
    if activity_id is not None:
        activity_day = await crud.get_activity_days_between_date(
            session=session, activity_id=activity_id,
            day_start=day_start,
            day_end=day_end,
        )
        if activity_day is not None:
            return activity_day

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Activity day {activity_id} not found!",
        )
    else:
        return await crud.get_activity_days(session=session)


@router.post(
    "/",
    response_model=ActivityDay,
    status_code=status.HTTP_201_CREATED,
)
async def create_activity_day(
    activity_day_in: ActivityDayCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    # TODO: проверка есть ли такой пользователь web_app_user_id
    return await crud.create_activity_day(
        session=session,
        activity_day_in=activity_day_in,
    )


@router.put("/{activity_day_id}/")
async def update_activity_day(
    activity_day_update: ActivityDayUpdate,
    activity_day: ActivityDay = Depends(activity_day_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_activity_day(
        session=session,
        activity_day=activity_day,
        activity_day_update=activity_day_update,
    )


@router.patch("/{id}/")
async def update_activity_day_partial(
    activity_day_update: ActivityDayUpdatePartial,
    activity_day: ActivityDay = Depends(activity_day_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_activity_day(
        session=session,
        activity_day=activity_day,
        activity_day_update=activity_day_update,
        partial=True,
    )


@router.delete("/{id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_activity_day(
    activity_day: ActivityDay = Depends(activity_day_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_activity_day(session=session, activity_day=activity_day)
