from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.models.resource import Resource
from app.models.dispatch import Dispatch


def get_dashboard_stats(db: Session):

    total_incidents = db.query(Incident).count()

    active_incidents = (
        db.query(Incident)
        .filter(Incident.status != "resolved")
        .count()
    )

    resolved_incidents = (
        db.query(Incident)
        .filter(Incident.status == "resolved")
        .count()
    )

    available_resources = (
        db.query(Resource)
        .filter(Resource.status == "available")
        .count()
    )

    busy_resources = (
        db.query(Resource)
        .filter(Resource.status == "busy")
        .count()
    )

    active_dispatches = (
        db.query(Dispatch)
        .filter(
            Dispatch.status.in_(
                ["assigned", "en_route", "arrived"]
            )
        )
        .count()
    )
    recent_incidents = (
        db.query(Incident)
        .order_by(Incident.id.desc())
        .limit(5)
        .all()
    )

    recent_dispatches = (
        db.query(Dispatch)
        .order_by(Dispatch.id.desc())
        .limit(5)
        .all()
    )

    return {
        "total_incidents": total_incidents,
        "active_incidents": active_incidents,
        "resolved_incidents": resolved_incidents,
        "available_resources": available_resources,
        "busy_resources": busy_resources,
        "active_dispatches": active_dispatches,
        "recent_incidents": [
            {
                "id": i.id,
                "title": i.title,
                "status": i.status
            }
            for i in recent_incidents
        ],
        "recent_dispatches": [
            {
                "id": d.id,
                "incident_id": d.incident_id,
                "resource_id": d.resource_id,
                "status": d.status
            }
            for d in recent_dispatches
        ]
    }


def get_live_dashboard_data(db: Session):

    stats = get_dashboard_stats(db)

    recent_incidents = (
        db.query(Incident)
        .order_by(Incident.id.desc())
        .limit(5)
        .all()
    )

    recent_dispatches = (
        db.query(Dispatch)
        .order_by(Dispatch.id.desc())
        .limit(5)
        .all()
    )

    return {
        "stats": stats,

        "recent_incidents": [
            {
                "id": i.id,
                "title": i.title,
                "status": i.status,
                "location": i.location
            }
            for i in recent_incidents
        ],

        "recent_dispatches": [
            {
                "id": d.id,
                "incident_id": d.incident_id,
                "resource_id": d.resource_id,
                "status": d.status
            }
            for d in recent_dispatches
        ]
    }
    
