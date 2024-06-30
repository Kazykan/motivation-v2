from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, Week
from . import crud


async def week_day_id(
    week_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Week:
    """Делаем это как зависимость"""
    week = await crud.get_week_day(session=session, week_id=week_id)
    if week is not None:
        return week

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Week {week_id} not found!",
    )
