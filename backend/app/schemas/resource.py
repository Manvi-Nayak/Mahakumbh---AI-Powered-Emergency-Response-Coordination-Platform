from pydantic import BaseModel
from typing import Optional


class ResourceCreate(BaseModel):
    name: str
    resource_type: str
    location: Optional[str] = None
    personnel_count: int = 1


class ResourceResponse(BaseModel):
    id: int
    name: str
    resource_type: str
    status: str
    location: Optional[str]
    personnel_count: int

    class Config:
        from_attributes = True