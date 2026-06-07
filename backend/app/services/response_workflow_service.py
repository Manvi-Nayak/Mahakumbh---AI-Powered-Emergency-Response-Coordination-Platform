from sqlalchemy.orm import Session

from app.models.incident import Incident

from app.ai.services.ai_orchestrator import (
    analyze_incident
)

from app.services.recommendation_service import (
    get_recommended_resources
)

def process_incident_workflow(
    db: Session,
    incident_id: int
):
    incident = (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )

    if not incident:
        raise Exception("Incident not found")
    
    incident_text = f"""
    Title: {incident.title}
    Description: {incident.description}
    Location: {incident.location}
"""
    analysis = analyze_incident(incident_text)
    resources = get_recommended_resources(db,analysis["category"])
    return {
        "incident_id": incident.id,
        "title": incident.title,
        "category": analysis["category"],
        "severity": analysis["severity"],
        "severity_score": analysis["severity_score"],
        "escalation_probability": analysis["escalation_probability"],
        "recommended_resources": [
            {
                "id": r.id,
                "name": r.name,
                "type": r.resource_type
            }
            for r in resources
            ]
    }

    analysis = analyze_incident(
        incident.title,
        incident.description
    )

    resources = get_recommended_resources(
        db,
        analysis["category"]
    )

    return {
        "incident_id": incident.id,
        "title": incident.title,
        "category": analysis["category"],
        "severity": analysis["severity"],
        "severity_score": analysis["severity_score"],
        "escalation_probability":
            analysis["escalation_probability"],
        "recommended_resources": [
            {
                "id": r.id,
                "name": r.name,
                "type": r.resource_type
            }
            for r in resources
        ]
    }