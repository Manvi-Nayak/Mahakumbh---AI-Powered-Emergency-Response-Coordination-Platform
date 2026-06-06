from fastapi import APIRouter

from pydantic import BaseModel

from app.ai.agents.analyzer_agent import (
    analyze_incident
)

from app.ai.services.ai_orchestrator import (
    run_ai_pipeline
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class IncidentAnalysisRequest(BaseModel):
    description: str


# @router.post("/analyze")
# def analyze(
#     request: IncidentAnalysisRequest
# ):
#     return analyze_incident(
#         request.description
#     )

@router.post("/analyze")
def analyze(request: IncidentAnalysisRequest):

    return run_ai_pipeline(
        request.description
    )