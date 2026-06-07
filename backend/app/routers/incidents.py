from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.incident import (
    IncidentCreate,
    IncidentResponse
)

from app.services.incident_service import (
    create_incident,
    get_all_incidents,
    get_incident,
    delete_incident
)

from app.services.notification_service import (
    broadcast_incident_created
)

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)


# @router.post("/", response_model=IncidentResponse)
# def create(
#     incident: IncidentCreate,
#     db: Session = Depends(get_db)
# ):
#     return create_incident(db, incident)

@router.post("/", response_model=IncidentResponse)
async def create(
    incident: IncidentCreate,
    db: Session = Depends(get_db)
):
    created_incident = create_incident(
        db,
        incident
    )

    await broadcast_incident_created(
        created_incident.id,
        created_incident.title
    )

    return created_incident


@router.get("/", response_model=list[IncidentResponse])
def get_all(
    db: Session = Depends(get_db)
):
    return get_all_incidents(db)


@router.get("/{incident_id}",
            response_model=IncidentResponse)
def get_one(
    incident_id: int,
    db: Session = Depends(get_db)
):
    incident = get_incident(db, incident_id)

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return incident


@router.delete("/{incident_id}")
def delete(
    incident_id: int,
    db: Session = Depends(get_db)
):

    incident = delete_incident(
        db,
        incident_id
    )

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return {
        "message": "Incident deleted successfully"
    }