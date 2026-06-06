from pydantic import BaseModel
from datetime import datetime

class DispatchCreate(BaseModel):
    incident_id: int
    resource_id: int


class DispatchResponse(BaseModel):
    id: int
    incident_id: int
    resource_id: int
    status: str
    assigned_at: datetime

    class Config:
        from_attributes = True