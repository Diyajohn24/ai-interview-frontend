from fastapi import APIRouter
from models.interview_models import StartInterviewRequest, SubmitAnswerRequest
from services.interview_manager import create_interview_session, add_answer, get_interview_results
from services.ai_service import process_interview_step
from services.interview_manager import get_interview_status
from database.db import SessionLocal
from database.models import Interview
from models.interview_models import StartInterviewWithResumeRequest
from services.interview_manager import create_interview_with_resume
import requests
router = APIRouter()

@router.post("/startInterview")
def start_interview(data: StartInterviewRequest):

    session = create_interview_session(data.candidateName, data.role)

    from services.ai_service import start_ai_interview

    ai_response = start_ai_interview(data.resume)

    return {
        "interviewId": session["interviewId"],
        "question": ai_response.get("question"),
        "conversation": ai_response.get("conversation")
    }


@router.post("/submitAnswer")
def submit_answer(data: SubmitAnswerRequest):

    try:

        ai_response = process_interview_step(
            data.conversation,
            data.answer
        )

        session = add_answer(
            data.interviewId,
            "AI Question",
            data.answer
        )

        if not session:
            return {"error": "Invalid interview ID"}

        if ai_response.get("done"):

            return {
                "status": "completed",
                "report": ai_response.get("report")
            }

        return {
            "question": ai_response.get("question"),
            "conversation": ai_response.get("conversation"),
            "status": session["status"]
        }

    except Exception as e:

        return {
            "error": "Answer processing failed",
            "details": str(e)
        }
@router.get("/interviewStatus/{interview_id}")
def interview_status(interview_id: str):

    status = get_interview_status(interview_id)

    if not status:
        return {"error": "Interview not found"}

    return status
@router.get("/leaderboard")
def leaderboard():

    db = SessionLocal()

    interviews = db.query(Interview).all()

    results = []

    for interview in interviews:
        results.append({
            "candidate": interview.candidate,
            "role": interview.role,
            "score": interview.final_score
        })

    db.close()

    return results
@router.get("/interviewHistory")
def interview_history():

    db = SessionLocal()

    interviews = db.query(Interview).all()

    history = []

    for interview in interviews:
        history.append({
            "candidate": interview.candidate,
            "role": interview.role,
            "transcript": interview.transcript,
            "score": interview.final_score
        })

    db.close()

    return history
@router.get("/analytics")
def analytics():

    db = SessionLocal()

    interviews = db.query(Interview).all()

    if len(interviews) == 0:
        return {
            "totalInterviews": 0,
            "averageScore": 0,
            "highestScore": 0,
            "lowestScore": 0,
            "passRate": 0
        }

    scores = []

    for interview in interviews:
        try:
            scores.append(float(interview.final_score))
        except:
            scores.append(0)

    total = len(scores)

    average = sum(scores) / total
    highest = max(scores)
    lowest = min(scores)

    passing = len([s for s in scores if s >= 6])
    pass_rate = (passing / total) * 100

    db.close()

    return {
        "totalInterviews": total,
        "averageScore": round(average, 2),
        "highestScore": highest,
        "lowestScore": lowest,
        "passRate": round(pass_rate, 2)
    }
@router.post("/startInterviewWithResume")
def start_interview_with_resume(data: StartInterviewWithResumeRequest):

    session = create_interview_with_resume(
        data.candidateName,
        data.role,
        data.resumeText
    )

    return {
        "interviewId": session["interviewId"],
        "question": "Based on your resume, can you explain your experience with these technologies?"
    }
@router.get("/topCandidates")
def top_candidates():

    db = SessionLocal()

    interviews = db.query(Interview).all()

    candidates = []

    for interview in interviews:

        try:
            score = float(interview.final_score)
        except:
            score = 0

        candidates.append({
            "candidate": interview.candidate,
            "role": interview.role,
            "score": score
        })

    candidates.sort(key=lambda x: x["score"], reverse=True)

    db.close()

    return candidates[:5]