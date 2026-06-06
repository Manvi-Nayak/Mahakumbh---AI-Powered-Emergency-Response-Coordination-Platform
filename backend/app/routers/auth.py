from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.auth import (
    UserRegister,
    UserLogin,
    TokenResponse
)

from app.services.auth_service import (
    create_user,
    authenticate_user
)

from app.core.security import (
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    created_user = create_user(
        db,
        user.name,
        user.email,
        user.password
    )

    return {
        "message": "User registered",
        "user_id": created_user.id
    }


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    authenticated_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": authenticated_user.email,
            "role": authenticated_user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }