from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate


def create_incident(db: Session, incident: IncidentCreate):

    new_incident = Incident(
        title=incident.title,
        description=incident.description,
        category=incident.category,
        severity=incident.severity,
        location=incident.location
    )

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    return new_incident


def get_all_incidents(db: Session):
    return db.query(Incident).all()


def get_incident(db: Session, incident_id: int):
    return db.query(Incident).filter(
        Incident.id == incident_id
    ).first()


def delete_incident(db: Session, incident_id: int):

    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if incident:
        db.delete(incident)
        db.commit()

    return incident