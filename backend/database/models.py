from sqlalchemy import Column, Integer, String, Text
from .db import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)
    interview_id = Column(String, unique=True)
    candidate = Column(String)
    role = Column(String)
    transcript = Column(Text)
    final_score = Column(String)