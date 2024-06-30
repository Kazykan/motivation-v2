from fastapi import APIRouter

from .child.views import router as child_router
from .parent.views import router as parents_router
from .activity.views import router as activity
from .activity_day.views import router as activity_days_router
from .week.views import router as week_days_router

router = APIRouter()

router.include_router(router=child_router, prefix="/children")
router.include_router(router=parents_router, prefix="/parents")
router.include_router(router=activity, prefix="/activities")
router.include_router(router=activity_days_router, prefix="/activity_days")
router.include_router(router=week_days_router, prefix="/week_days")
