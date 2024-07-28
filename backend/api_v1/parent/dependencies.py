from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import db_helper, Parent
from . import crud


async def parent_by_id(
    parent_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Parent:
    """Делаем это как зависимость"""
    parent = await crud.get_parent_by_id(session=session, parent_id=parent_id)
    if parent is not None:
        return parent

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Parent {parent_id} not found!",
    )
