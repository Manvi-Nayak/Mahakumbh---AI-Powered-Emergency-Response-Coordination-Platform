from sqlalchemy.orm import Session

from app.models.dispatch import Dispatch
from app.models.resource import Resource

def create_dispatch(
    db: Session,
    incident_id: int,
    resource_id: int
):
    resource = (
        db.query(Resource)
        .filter(Resource.id == resource_id)
        .first()
    )

    if not resource:
        raise Exception("Resource not found")

    if resource.status != "available":
        raise Exception("Resource not available")

    dispatch = Dispatch(
        incident_id=incident_id,
        resource_id=resource_id,
        status="assigned"
    )

    db.add(dispatch)

    # Mark resource busy
    resource.status = "busy"

    db.commit()
    db.refresh(dispatch)

    return dispatch