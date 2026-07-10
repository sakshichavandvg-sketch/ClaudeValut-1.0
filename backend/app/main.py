from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from loguru import logger
import uvicorn

from app.core.config import settings
from app.core.logging import setup_logging
from app.api.v1.health.router import router as health_router

# Initialize logging
setup_logging()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS Configuration
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

from app.exceptions import (
    AuthenticationError,
    InvalidCredentials,
    TokenExpired,
    UserAlreadyExists,
    UserNotFound
)

# Exception Handlers
@app.exception_handler(UserAlreadyExists)
async def user_already_exists_handler(request: Request, exc: UserAlreadyExists):
    logger.warning(f"UserAlreadyExists: {exc}")
    return JSONResponse(status_code=400, content={"success": False, "message": str(exc)})

@app.exception_handler(UserNotFound)
async def user_not_found_handler(request: Request, exc: UserNotFound):
    logger.warning(f"UserNotFound: {exc}")
    return JSONResponse(status_code=404, content={"success": False, "message": str(exc)})

@app.exception_handler(InvalidCredentials)
async def invalid_credentials_handler(request: Request, exc: InvalidCredentials):
    logger.warning(f"InvalidCredentials: {exc}")
    return JSONResponse(status_code=401, content={"success": False, "message": str(exc)})

@app.exception_handler(TokenExpired)
async def token_expired_handler(request: Request, exc: TokenExpired):
    logger.warning(f"TokenExpired: {exc}")
    return JSONResponse(status_code=401, content={"success": False, "message": str(exc)})

@app.exception_handler(AuthenticationError)
async def authentication_error_handler(request: Request, exc: AuthenticationError):
    logger.warning(f"AuthenticationError: {exc}")
    return JSONResponse(status_code=401, content={"success": False, "message": str(exc)})

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "An internal server error occurred."}
    )

from app.api.v1.auth.router import router as auth_router

# API Routers
app.include_router(health_router, prefix=f"{settings.API_V1_STR}/health", tags=["health"])
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
