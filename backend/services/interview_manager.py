import uuid
import time
from database.db import SessionLocal
from database.models import Interview
interview_sessions = {}

MAX_QUESTIONS = 5


def create_interview_session(candidate_name, role):

    interview_id = str(uuid.uuid4())

    session = {
        "interviewId": interview_id,
        "candidateName": candidate_name,
        "role": role,
        "resume": "",
        "questions": [],
        "answers": [],
        "scores": [],
        "difficultyLevels": [],
        "currentQuestionNumber": 0,
        "status": "ongoing",
        "startTime": time.time()
    }

    interview_sessions[interview_id] = session

    return session


def add_answer(interview_id, question, answer, score_data=None, difficulty="medium"):

    session = interview_sessions.get(interview_id)

    if not session:
        return None

    session["questions"].append(question)
    session["answers"].append(answer)
    session["difficultyLevels"].append(difficulty)
    if score_data:
        session["scores"].append(score_data)

    session["currentQuestionNumber"] += 1

    if session["currentQuestionNumber"] >= MAX_QUESTIONS:
        session["status"] = "completed"
        save_interview_to_db(session)

    return session


def get_interview_status(interview_id):

    session = interview_sessions.get(interview_id)

    if not session:
        return None

    elapsed = int(time.time() - session["startTime"])

    return {
        "candidate": session["candidateName"],
        "role": session["role"],
        "currentQuestionNumber": session["currentQuestionNumber"],
        "maxQuestions": MAX_QUESTIONS,
        "status": session["status"],
        "timeElapsedSeconds": elapsed
    }


def calculate_final_scores(session):

    if not session["scores"]:
        return {}

    total_technical = 0
    total_communication = 0
    total_behavior = 0
    total_confidence = 0

    count = len(session["scores"])

    for score in session["scores"]:
        total_technical += score.get("technical", 0)
        total_communication += score.get("communication", 0)
        total_behavior += score.get("behavior", 0)
        total_confidence += score.get("confidence", 0)

    return {
        "technical_score": round(total_technical / count, 2),
        "communication_score": round(total_communication / count, 2),
        "behavior_score": round(total_behavior / count, 2),
        "confidence_score": round(total_confidence / count, 2),
        "overall_score": round(
            (total_technical +
             total_communication +
             total_behavior +
             total_confidence) / (4 * count),
            2
        )
    }


def generate_transcript(session):

    transcript = []

    for i in range(len(session["questions"])):

        transcript.append({
            "question": session["questions"][i],
            "answer": session["answers"][i]
        })

    return transcript


def generate_report(session):

    return {
        "candidate": session["candidateName"],
        "role": session["role"],
        "status": session["status"],
        "finalScores": calculate_final_scores(session),
        "transcript": generate_transcript(session)
    }


def get_interview_results(interview_id):

    session = interview_sessions.get(interview_id)

    if not session:
        return None

    return generate_report(session)
def save_interview_to_db(session):

    db = SessionLocal()

    transcript_text = ""

    for i in range(len(session["questions"])):
        transcript_text += f"Q: {session['questions'][i]}\n"
        transcript_text += f"A: {session['answers'][i]}\n\n"

    scores = calculate_final_scores(session)

    interview = Interview(
        interview_id=session["interviewId"],
        candidate=session["candidateName"],
        role=session["role"],
        transcript=transcript_text,
        final_score=str(scores.get("overall_score", 0))
    )

    db.add(interview)
    db.commit()
    db.close()
def create_interview_with_resume(candidate_name, role, resume):

    session = create_interview_session(candidate_name, role)

    session["resume"] = resume

    return session