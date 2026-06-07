from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.response_workflow import (
    WorkflowRequest
)

from app.services.response_workflow_service import (
    process_incident_workflow
)

router = APIRouter(
    prefix="/response-workflow",
    tags=["Response Workflow"]
)

@router.post("/")
def run_workflow(
    workflow_data: WorkflowRequest,
    db: Session = Depends(get_db)
):
    try:
        return process_incident_workflow(
            db,
            workflow_data.incident_id
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )