from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.recommendation_service import (
    get_recommended_resources
)

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)

@router.get("/{category}")
def recommend_resources(
    category: str,
    db: Session = Depends(get_db)
):
    resources = get_recommended_resources(
        db,
        category
    )
    
    return {
        "category": category,
        "recommended_resources": resources
    }