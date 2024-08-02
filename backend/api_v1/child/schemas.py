from typing import List, TYPE_CHECKING
from pydantic import BaseModel, ConfigDict
import datetime

# if TYPE_CHECKING:
#     pass
# from api_v1.parent.schemas import Parent

class ChildBase(BaseModel):
    bot_user_id: int
    name: str
    birthday: datetime.date | None
    sex: int
    max_payout: int | None
    phone: str
    # parents: list[int] | None
    # activities: list[int] | None


class ChildCreate(ChildBase):
    pass


class ChildUpdate(ChildCreate):
    pass


class ChildUpdatePartial(ChildCreate):
    bot_user_id: int | None = None
    name: str | None = None
    birthday: datetime.date | None = None
    sex: int | None = None
    max_payout: int | None = None
    phone: str | None = None
    # parents: list[int] | None = None
    # activities: list[int] | None = None


class Child(ChildBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class Parent(BaseModel):
    id: int
    bot_user_id: int
    name: str
    sex: int
    access: int = 0
    phone: str | None


class ChildSchema(Child):
    parents: list[Parent]