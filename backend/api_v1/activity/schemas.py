from pydantic import BaseModel, ConfigDict


class ActivityBase(BaseModel):
    name: str
    title: str | None
    percent_complete: int
    cost: int
    max_cost: int | None
    child_id: int
    # activity_days: list[]


class ActivityCreate(ActivityBase):
    pass


class ActivityUpdate(ActivityCreate):
    pass


class ActivityUpdatePartial(ActivityCreate):
    name: str | None = None
    title: str | None = None
    percent_complete: int | None = None
    cost: int | None = None
    max_cost: int | None = None
    child_id: int | None = None


class Activity(ActivityBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
