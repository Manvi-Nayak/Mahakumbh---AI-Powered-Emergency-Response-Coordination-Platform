from pydantic import BaseModel

class WorkflowRequest(BaseModel):
    incident_id: int