import datetime
from fastapi import FastAPI
import uvicorn
from contextlib import asynccontextmanager
from api_v1.activity.crud import update_all_activity_days_in_period
from api_v1.activity_day.crud import update_one_activity_days_in_period
from core.models import Base, db_helper
from api_v1 import router as router_v1
from core.config import settings
from fastapi.middleware.cors import CORSMiddleware

import threading
from datetime import datetime

from apscheduler.schedulers.asyncio import AsyncIOScheduler


async def tick():
    async with db_helper.session_factory() as session:
        result = await update_all_activity_days_in_period(session=session, child_id=1)
        # result = await update_one_activity_days_in_period(session=session, activity_id=2)
        print(result)
    # print(f"threading {threading.get_ident()} Hello, the time is", datetime.now())


@asynccontextmanager
async def lifespan(app: FastAPI):
    global scheduler
    scheduler = AsyncIOScheduler()
    scheduler.add_job(tick, "interval", seconds=100000)
    scheduler.start()
    async with db_helper.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield
    scheduler.shutdown()


app = FastAPI(
    title="Motivation bot",
    lifespan=lifespan,
)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:5173",
    "127.0.0.1:46532",
    "https://tg-mini-app.local",
    "http://tg-mini-app.local",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router=router_v1, prefix=settings.api_v1_prefix)


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        reload=True,
    )
