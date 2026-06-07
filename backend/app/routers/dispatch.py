from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.dispatch import (
    DispatchCreate,
    DispatchResponse,
    DispatchStatusUpdate
)

from app.services.dispatch_service import (
    create_dispatch,
    get_all_dispatches,
    get_dispatch_by_id,
    update_dispatch_status
)

from app.services.notification_service import (
    broadcast_dispatch_created,
    broadcast_dispatch_updated
)

router = APIRouter(
    prefix="/dispatch",
    tags=["Dispatch"]
)


@router.post(
    "/",
    response_model=DispatchResponse
)
async def dispatch_resource(
    dispatch_data: DispatchCreate,
    db: Session = Depends(get_db)
):
    try:

        dispatch = create_dispatch(
            db,
            dispatch_data.incident_id,
            dispatch_data.resource_id
        )

        await broadcast_dispatch_created(
            dispatch.id,
            dispatch.resource_id
        )

        return dispatch

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get(
    "/",
    response_model=list[DispatchResponse]
)
def get_dispatches(
    db: Session = Depends(get_db)
):
    return get_all_dispatches(db)


@router.get(
    "/{dispatch_id}",
    response_model=DispatchResponse
)
def get_dispatch(
    dispatch_id: int,
    db: Session = Depends(get_db)
):
    dispatch = get_dispatch_by_id(
        db,
        dispatch_id
    )

    if not dispatch:
        raise HTTPException(
            status_code=404,
            detail="Dispatch not found"
        )

    return dispatch


@router.patch(
    "/{dispatch_id}/status",
    response_model=DispatchResponse
)
async def change_dispatch_status(
    dispatch_id: int,
    status_data: DispatchStatusUpdate,
    db: Session = Depends(get_db)
):
    try:

        dispatch = update_dispatch_status(
            db,
            dispatch_id,
            status_data.status
        )

        await broadcast_dispatch_updated(
            dispatch.id,
            dispatch.status
        )

        return dispatch

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )