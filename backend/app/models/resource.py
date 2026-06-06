from sqlalchemy import Column, Integer, String

from app.database import Base


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    resource_type = Column(String, nullable=False)

    status = Column(String, default="available")

    location = Column(String)

    personnel_count = Column(Integer, default=1)