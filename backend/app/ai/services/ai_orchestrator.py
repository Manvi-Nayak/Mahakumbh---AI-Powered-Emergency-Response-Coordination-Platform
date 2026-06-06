from app.ai.agents.analyzer_agent import (
    analyze_incident
)

def run_ai_pipeline(description: str):
    return analyze_incident(description)