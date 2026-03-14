import requests
import base64

AI_BASE_URL = "https://literary-pauline-nonparty.ngrok-free.dev"


def start_ai_interview(resume_text):

    files = {
        "file": ("resume.pdf", resume_text.encode("utf-8"))
    }

    try:
        response = requests.post(
            f"{AI_BASE_URL}/start-interview",
            files=files
        )

        return response.json()

    except Exception:
        return {
            "question": "AI service unavailable.",
            "conversation": []
        }


def process_interview_step(conversation, answer):

    payload = {
        "conversation": conversation,
        "answer": answer
    }

    try:
        response = requests.post(
            f"{AI_BASE_URL}/next-question",
            json=payload
        )

        return response.json()

    except Exception:
        return {
            "done": False,
            "conversation": conversation,
            "question": "AI service unavailable."
        }