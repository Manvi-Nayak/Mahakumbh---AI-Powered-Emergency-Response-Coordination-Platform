from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text)

    category = Column(String)

    severity = Column(String)

    status = Column(String, default="reported")

    location = Column(String)