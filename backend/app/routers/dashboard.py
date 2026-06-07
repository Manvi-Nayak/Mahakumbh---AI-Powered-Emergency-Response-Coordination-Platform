from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.services.dashboard_service import (
    get_dashboard_stats
)
from app.services.dashboard_service import (
    get_dashboard_stats,
    get_live_dashboard_data
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):
    return get_dashboard_stats(db)

@router.get("/live")
def live_dashboard(
    db: Session = Depends(get_db)
):
    return get_live_dashboard_data(db)