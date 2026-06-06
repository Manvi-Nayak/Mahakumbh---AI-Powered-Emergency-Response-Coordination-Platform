from pydantic import BaseModel
from typing import Optional


class IncidentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    severity: Optional[str] = None
    location: Optional[str] = None


class IncidentResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    category: Optional[str]
    severity: Optional[str]
    status: str
    location: Optional[str]

    class Config:
        from_attributes = True