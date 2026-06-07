from fastapi import FastAPI

from app.database import Base, engine
from app.models.user import User
from app.models.incident import Incident
from app.routers.incidents import router as incident_router
from app.routers.auth import (router as auth_router)
from app.models.resource import Resource
from app.routers.resources import (router as resource_router)
from app.routers.ai import (router as ai_router)
from app.routers import recommendations
from app.routers import dispatch
from app.models.dispatch import Dispatch
from app.routers import response_workflow
from app.routers import dashboard
from app.routers import websocket


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Emergency Response Coordination System",
    version="1.0.0"
)
app.include_router(auth_router)
app.include_router(incident_router)
app.include_router(resource_router)
app.include_router(ai_router)
app.include_router(recommendations.router)
app.include_router(dispatch.router)
app.include_router(response_workflow.router)
app.include_router(dashboard.router)
app.include_router(websocket.router)
# app.include_router()

@app.get("/")
def root():
    return {
        "message": "AI Emergency Response Coordination System API Running"
    }
