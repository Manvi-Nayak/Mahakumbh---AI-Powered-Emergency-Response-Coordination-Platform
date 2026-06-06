from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.dispatch import (
    DispatchCreate,
    DispatchResponse
)

from app.services.dispatch_service import (
    create_dispatch
)

router = APIRouter(
    prefix="/dispatch",
    tags=["Dispatch"]
)

@router.post(
    "/",
    response_model=DispatchResponse
)
def dispatch_resource(
    dispatch_data: DispatchCreate,
    db: Session = Depends(get_db)
):
    try:
        dispatch = create_dispatch(
            db,
            dispatch_data.incident_id,
            dispatch_data.resource_id
        )

        return dispatch

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )