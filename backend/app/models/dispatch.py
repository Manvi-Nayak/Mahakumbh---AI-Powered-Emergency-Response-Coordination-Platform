from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

from app.database import Base

class Dispatch(Base):
    __tablename__ = "dispatches"

    id = Column(Integer, primary_key=True, index=True)

    incident_id = Column(Integer, ForeignKey("incidents.id"))

    resource_id = Column(Integer, ForeignKey("resources.id"))

    status = Column(String, default="assigned")

    assigned_at = Column(DateTime, default=datetime.utcnow)