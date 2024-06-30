import sys
from typing import TYPE_CHECKING, List
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from api_v1.child.schemas import ChildBase


class ParentBase(BaseModel):
    bot_user_id: int
    name: str
    sex: int
    access: int = 0
    phone: str


class ParentCreate(ParentBase):
    pass


class ParentUpdate(ParentCreate):
    pass


class ParentUpdatePartial(ParentCreate):
    bot_user_id: int | None = None
    name: str | None = None
    sex: int | None = None
    access: int | None = None
    phone: str | None = None


class Parent(ParentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int