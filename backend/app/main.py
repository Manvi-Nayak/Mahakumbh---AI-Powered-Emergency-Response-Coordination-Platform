from fastapi import FastAPI

from app.database import Base, engine

from app.models.user import User
from app.models.incident import Incident

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Emergency Response Coordination System",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "AI Emergency Response Coordination System API Running"
    }