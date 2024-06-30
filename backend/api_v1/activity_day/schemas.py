import datetime
from pydantic import BaseModel, ConfigDict


class ActivityDayBase(BaseModel):
    is_done: bool = False
    day: datetime.date
    activity_id: int


class ActivityDayCreate(ActivityDayBase):
    pass


class ActivityDayUpdate(ActivityDayCreate):
    pass


class ActivityDayUpdatePartial(ActivityDayCreate):
    is_done: bool | None = None
    day: datetime.date | None = None
    activity_id: int | None = None


class ActivityDay(ActivityDayBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
