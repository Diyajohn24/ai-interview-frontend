from pydantic import BaseModel
from typing import List, Dict

class StartInterviewRequest(BaseModel):
    candidateName: str
    role: str
    resume: str   # base64 or text resume

class SubmitAnswerRequest(BaseModel):
    interviewId: str
    conversation: List[Dict]
    answer: str

class StartInterviewWithResumeRequest(BaseModel):
    candidateName: str
    role: str
    resumeText: str