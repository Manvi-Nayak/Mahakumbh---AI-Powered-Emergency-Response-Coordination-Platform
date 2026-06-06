from fastapi import FastAPI

from app.database import Base, engine

from app.models.user import User
from app.models.incident import Incident

from app.routers.incidents import router as incident_router

from app.routers.auth import (
    router as auth_router
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Emergency Response Coordination System",
    version="1.0.0"
)
app.include_router(auth_router)
app.include_router(incident_router)


@app.get("/")
def root():
    return {
        "message": "AI Emergency Response Coordination System API Running"
    }