from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.resource import (
    ResourceCreate,
    ResourceResponse
)

from app.services.resource_service import (
    create_resource,
    get_resources
)

router = APIRouter(
    prefix="/resources",
    tags=["Resources"]
)


@router.post("/", response_model=ResourceResponse)
def create(
    resource: ResourceCreate,
    db: Session = Depends(get_db)
):
    return create_resource(db, resource)


@router.get("/", response_model=list[ResourceResponse])
def get_all(
    db: Session = Depends(get_db)
):
    return get_resources(db)