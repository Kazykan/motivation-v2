from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    Week,
    WeekCreate,
)
from . import crud
from .dependencies import week_day_id
from core.models import db_helper

router = APIRouter(tags=["Week days"])


@router.get("/", response_model=list[Week])
async def get_week_days(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    week_day_id: int | None = None,
):
    if week_day_id is not None:
        webAppUser = await crud.get_week_days_by_activity_id(
            session=session, activity_id=week_day_id
        )
        if webAppUser is not None:
            return webAppUser

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Week day {week_day_id} not found!",
        )
    else:
        return await crud.get_webAppUsers(session=session)


@router.post(
    "/",
    response_model=Week,
    status_code=status.HTTP_201_CREATED,
)
async def create_week_day(
    week_day_in: WeekCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_week_day(
        session=session,
        week_day_in=week_day_in,
    )


@router.delete("/{week_day_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_webAppUser(
    week_day: Week = Depends(week_day_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_week_day(session=session, week_day=week_day)
