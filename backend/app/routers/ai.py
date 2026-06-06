from fastapi import APIRouter

from pydantic import BaseModel

from app.ai.analyzer_agent import (
    analyze_incident
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class IncidentAnalysisRequest(BaseModel):
    description: str


@router.post("/analyze")
def analyze(
    request: IncidentAnalysisRequest
):
    return analyze_incident(
        request.description
    )