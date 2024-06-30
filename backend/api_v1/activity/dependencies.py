from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, Activity
from . import crud


async def activity_by_id(
    activity_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Activity:
    """Делаем это ка зависимость"""
    activity = await crud.get_activity(session=session, activity_id=activity_id)
    if activity is not None:
        return activity

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Activity {activity_id} not found!",
    )
