import datetime
from .base import Base
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy import (
    Date,
    ForeignKey,
    String,
    Column,
    Integer,
    Boolean,
    SmallInteger,
    Table,
)
from typing import List


#  Связь многие-ко-многим дети - родители
child_mtm_parent = Table(
    "child_mtm_parent",
    Base.metadata,
    Column("child_id", ForeignKey("child.id")),
    Column("parent_id", ForeignKey("parent.id")),
)


#  Связь многие-ко-многим задачи - дни недели
activity_mtm_week = Table(
    "activity_mtm_week",
    Base.metadata,
    Column("activity_id", ForeignKey("activity.id"), unique=True),
    Column("week_id", ForeignKey("week.id"), unique=True),
)


class Child(Base):
    """Ребенок"""

    __tablename__ = "child"

    id: Mapped[int] = mapped_column(primary_key=True)
    bot_user_id: Mapped[int] = mapped_column(Integer, nullable=True, unique=True)
    name: Mapped[str] = mapped_column(String(30))
    birthday: Mapped[datetime.date] = mapped_column(Date, nullable=True)
    # Standard ISO/IEC 5218 0 -not known, 1 -Male, 2 -Female, 9 -Not applicable
    sex: Mapped[int] = mapped_column(SmallInteger)
    max_payout: Mapped[int] = mapped_column(Integer, nullable=True)
    # TODO: Сделать уникальным поле
    phone: Mapped[str] = mapped_column(String(12))
    parents: Mapped[List["Parent"]] = relationship(
        secondary=child_mtm_parent, back_populates="children"
    )
    activities: Mapped[List["Activity"]] = relationship()


class Parent(Base):
    """Родители"""

    __tablename__ = "parent"

    id: Mapped[int] = mapped_column(primary_key=True)
    bot_user_id: Mapped[int] = mapped_column(Integer, nullable=True, unique=True)
    name: Mapped[str] = mapped_column(String(30))
    # Standard ISO/IEC 5218 0 -not known, 1 -Male, 2 -Female, 9 -Not applicable
    sex: Mapped[int] = mapped_column(SmallInteger)
    # TODO расписать функционал доступа
    access: Mapped[int] = mapped_column(Integer, default=0)
    phone: Mapped[str] = mapped_column(String(12))
    children: Mapped[List["Child"]] = relationship(
        secondary=child_mtm_parent, back_populates="parents"
    )


class Activity(Base):
    """Активности"""

    __tablename__ = "activity"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(15))
    title: Mapped[str] = mapped_column(String(200), nullable=True)
    # Процент выполнения для завершения задания
    percent_complete: Mapped[int] = mapped_column(SmallInteger)
    cost: Mapped[int] = mapped_column(SmallInteger)
    max_cost: Mapped[int] = mapped_column(SmallInteger, nullable=True)
    child_id: Mapped[int] = mapped_column(ForeignKey("child.id"))
    weeks: Mapped[List["Week"]] = relationship(
        secondary=activity_mtm_week, back_populates="activities"
    )  # выбор дня недели мтм
    activity_days: Mapped[List["Activity_day"]] = relationship(
        cascade="all, delete, delete-orphan"
    )


class Week(Base):
    """День недели для активностей"""

    __tablename__ = "week"

    id: Mapped[int] = mapped_column(primary_key=True)
    week_day: Mapped[str] = mapped_column(String(2))
    activities: Mapped[List["Activity"]] = relationship(
        secondary=activity_mtm_week, back_populates="weeks"
    )


class Activity_day(Base):
    """Активность по дням"""

    __tablename__ = "activity_day"

    id: Mapped[int] = mapped_column(primary_key=True)
    is_done: Mapped[bool] = mapped_column(Boolean, default=False)
    day: Mapped[datetime.date] = mapped_column(Date)
    activity_id: Mapped[int] = mapped_column(ForeignKey("activity.id"))
