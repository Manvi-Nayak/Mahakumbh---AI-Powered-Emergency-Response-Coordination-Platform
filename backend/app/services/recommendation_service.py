from sqlalchemy.orm import Session
from app.models.resource import Resource

RESOURCE_MAPPING = {
    "Fire": ["fire_truck"],
    "Medical": ["ambulance", "medical_team"],
    "Crime": ["police"],
    "Flood": ["ambulance", "police"],
    "Stampede": ["ambulance", "medical_team", "police"]
}

def get_recommended_resources(
    db: Session,
    category: str
):
    required_types = RESOURCE_MAPPING.get(category, [])

    resources = (
        db.query(Resource)
        .filter(
            Resource.resource_type.in_(required_types),
            Resource.status == "available"
        )
        .order_by(
        Resource.personnel_count.desc()
        )
        .limit(3)
        .all()
    )

    return resources