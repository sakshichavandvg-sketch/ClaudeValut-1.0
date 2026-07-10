import datetime
from fastapi import Response
from app.repositories.auth_repository import AuthRepository
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import hash_password, verify_password
from app.core.jwt import create_access_token, create_refresh_token, verify_token
from app.core.cookies import set_auth_cookies, clear_auth_cookies
from app.exceptions import InvalidCredentials, UserAlreadyExists, UserNotFound, AuthenticationError

class AuthService:
    def __init__(self, repository: AuthRepository):
        self.repo = repository

    def register_user(self, payload: RegisterRequest):
        existing_user = self.repo.get_user_by_email(payload.email)
        if existing_user:
            raise UserAlreadyExists("User with this email already exists")

        user_data = {
            "full_name": payload.full_name,
            "email": payload.email,
            "password_hash": hash_password(payload.password),
            "is_active": True,
            "is_verified": False,
        }
        return self.repo.create_user(user_data)

    def authenticate_user(self, payload: LoginRequest, response: Response):
        user = self.repo.get_user_by_email(payload.email)
        if not user or not verify_password(payload.password, user.password_hash):
            raise InvalidCredentials("Invalid email or password")
        if not user.is_active:
            raise AuthenticationError("User account is inactive")
        
        # Using email as subject since repo only supports get_user_by_email
        access_token = create_access_token(subject=user.email)
        refresh_token = create_refresh_token(subject=user.email)

        token_payload = verify_token(refresh_token, "refresh")
        expires_at = datetime.datetime.fromtimestamp(token_payload["exp"], tz=datetime.timezone.utc)

        self.repo.create_refresh_token({
            "user_id": user.id,
            "token_hash": refresh_token,
            "expires_at": expires_at
        })

        set_auth_cookies(response, access_token, refresh_token)
        return user, access_token, refresh_token

    def logout_user(self, refresh_token: str, response: Response):
        if refresh_token:
            self.repo.revoke_refresh_token(refresh_token)
        clear_auth_cookies(response)

    def refresh_session(self, refresh_token: str, response: Response):
        if not refresh_token:
            raise AuthenticationError("Refresh token missing")

        payload = verify_token(refresh_token, "refresh")
        db_token = self.repo.get_refresh_token(refresh_token)

        if not db_token or db_token.revoked:
            raise AuthenticationError("Refresh token is invalid or revoked")

        user = self.repo.get_user_by_email(payload["sub"])
        if not user or not user.is_active:
            raise AuthenticationError("User is inactive or not found")
        
        self.repo.revoke_refresh_token(refresh_token)
        
        new_access = create_access_token(subject=user.email)
        new_refresh = create_refresh_token(subject=user.email)
        
        new_token_payload = verify_token(new_refresh, "refresh")
        expires_at = datetime.datetime.fromtimestamp(new_token_payload["exp"], tz=datetime.timezone.utc)

        self.repo.create_refresh_token({
            "user_id": user.id,
            "token_hash": new_refresh,
            "expires_at": expires_at
        })
        
        set_auth_cookies(response, new_access, new_refresh)
        return user, new_access, new_refresh

    def get_current_user(self, access_token: str):
        payload = verify_token(access_token, "access")
        user = self.repo.get_user_by_email(payload["sub"])
        if not user:
            raise UserNotFound("User not found")
        return user
