# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from app.database import get_db
# from app.models.incident import Incident

# router = APIRouter(
#     prefix="/alerts",
#     tags=["Alerts"]
# )


# @router.get("/")
# def get_alerts(
#     db: Session = Depends(get_db)
# ):
#     incidents = (
#         db.query(Incident)
#         .order_by(Incident.id.desc())
#         .limit(20)
#         .all()
#     )

#     alerts = []

#     for incident in incidents:

#         severity = (
#             incident.severity.lower()
#             if incident.severity
#             else "medium"
#         )

#         alerts.append({
#             "id": incident.id,
#             "title": incident.title,
#             "description": incident.description,
#             "location": incident.location,
#             "severity": severity,
#             "status": incident.status
#         })

#     return alerts

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.incident import Incident

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


@router.get("/")
def get_alerts(
    db: Session = Depends(get_db)
):
    incidents = (
        db.query(Incident)
        .order_by(Incident.id.desc())
        .limit(20)
        .all()
    )

    alerts = []

    for incident in incidents:

        severity = (
            incident.severity.lower()
            if incident.severity
            else "medium"
        )

        alerts.append({
            "id": incident.id,
            "title": incident.title,
            "description": incident.description,
            "location": incident.location,
            "severity": severity,
            "status": incident.status
        })

    return alerts