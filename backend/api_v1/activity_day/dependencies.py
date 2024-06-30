from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, Activity_day
from . import crud


async def activity_day_by_id(
    activity_day_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Activity_day:
    """Делаем это как зависимость"""
    activity_day = await crud.get_activity_day(
        session=session, activity_day_id=activity_day_id
    )
    if activity_day is not None:
        return activity_day

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Activity day {activity_day_id} not found!",
    )
