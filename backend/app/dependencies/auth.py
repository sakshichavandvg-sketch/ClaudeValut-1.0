from fastapi import Depends, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.auth_repository import AuthRepository
from app.services.auth_service import AuthService
from app.exceptions import AuthenticationError

def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(AuthRepository(db))

def get_current_user(request: Request, auth_service: AuthService = Depends(get_auth_service)):
    token = request.cookies.get("access_token")
    if not token:
        # Check Authorization header as fallback
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            
    if not token:
        raise AuthenticationError("Not authenticated")
        
    return auth_service.get_current_user(token)

def get_current_active_user(current_user = Depends(get_current_user)):
    if not current_user.is_active:
        raise AuthenticationError("Inactive user")
    return current_user
