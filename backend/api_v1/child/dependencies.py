from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, Child
from . import crud


async def child_by_id(
    child_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Child:
    """Делаем это как зависимость"""
    child = await crud.get_child_by_id(session=session, child_id=child_id)
    if child is not None:
        return child

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Child {child_id} not found!",
    )
