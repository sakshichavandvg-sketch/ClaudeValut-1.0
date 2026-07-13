from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.user import User

class DashboardRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_summary(self, user_id: str) -> dict:
        stmt = select(User).where(User.id == user_id)
        user = self.db.execute(stmt).scalar_one_or_none()
        
        if not user:
            return {}
            
        return {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "avatar_url": user.avatar_url,
            "is_verified": user.is_verified,
            "statistics": {
                "total_files": 0,
                "total_folders": 0,
                "favorites": 0,
                "shared_files": 0
            }
        }

    def get_storage_summary(self, user_id: str) -> dict:
        return {
            "used_storage": 0,
            "available_storage": 15 * 1024 * 1024 * 1024, # 15 GB
            "total_storage": 15 * 1024 * 1024 * 1024,
            "percentage_used": 0.0
        }

    def get_recent_files(self, user_id: str) -> list:
        return []

    def get_recent_activity(self, user_id: str) -> list:
        return []
