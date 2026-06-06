from sqlalchemy.orm import Session

from app.models.resource import Resource
from app.schemas.resource import ResourceCreate


def create_resource(db: Session, resource: ResourceCreate):

    new_resource = Resource(
        name=resource.name,
        resource_type=resource.resource_type,
        location=resource.location,
        personnel_count=resource.personnel_count
    )

    db.add(new_resource)
    db.commit()
    db.refresh(new_resource)

    return new_resource


def get_resources(db: Session):
    return db.query(Resource).all()