from sqlalchemy.orm import Session

from app.models.dispatch import Dispatch
from app.models.resource import Resource


VALID_STATUSES = [
    "assigned",
    "en_route",
    "arrived",
    "completed",
    "cancelled"
]


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

    resource.status = "busy"

    db.commit()
    db.refresh(dispatch)

    return dispatch


def get_all_dispatches(db: Session):
    return db.query(Dispatch).all()


def get_dispatch_by_id(
    db: Session,
    dispatch_id: int
):
    return (
        db.query(Dispatch)
        .filter(Dispatch.id == dispatch_id)
        .first()
    )


# def update_dispatch_status(
#     db: Session,
#     dispatch_id: int,
#     status: str
# ):
#     dispatch = (
#         db.query(Dispatch)
#         .filter(Dispatch.id == dispatch_id)
#         .first()
#     )

#     if not dispatch:
#         raise Exception("Dispatch not found")

#     if status not in VALID_STATUSES:
#         raise Exception("Invalid status")

#     dispatch.status = status

#     resource = (
#         db.query(Resource)
#         .filter(Resource.id == dispatch.resource_id)
#         .first()
#     )

#     if status in ["completed", "cancelled"]:
#         resource.status = "available"

#     db.commit()
#     db.refresh(dispatch)

#     return dispatch

def update_dispatch_status(
    db: Session,
    dispatch_id: int,
    status: str
):
    dispatch = (
        db.query(Dispatch)
        .filter(Dispatch.id == dispatch_id)
        .first()
    )

    if not dispatch:
        raise Exception("Dispatch not found")

    if status not in VALID_STATUSES:
        raise Exception("Invalid status")

    dispatch.status = status

    resource = (
        db.query(Resource)
        .filter(Resource.id == dispatch.resource_id)
        .first()
    )

    if status in ["completed", "cancelled"]:

        if resource:
            resource.status = "available"

        incident = (
            db.query(Incident)
            .filter(
                Incident.id ==
                dispatch.incident_id
            )
            .first()
        )

        if incident:
            incident.status = "resolved"

    db.commit()
    db.refresh(dispatch)

    return dispatch