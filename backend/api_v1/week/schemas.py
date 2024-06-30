from pydantic import BaseModel, ConfigDict

# from api_v1.place.schemas import Place


class WeekBase(BaseModel):
    week_day: str


class WeekCreate(WeekBase):
    pass


class Week(WeekBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    # places: list[Place] | None
