const BASE_URL = "http://localhost:8000";

export async function startInterview(candidateName, role, resume) {
  const res = await fetch(`${BASE_URL}/startInterview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidateName, role, resume }),
  });
  return res.json();
}

export async function submitAnswer(interviewId, conversation, answer) {
  const res = await fetch(`${BASE_URL}/submitAnswer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interviewId, conversation, answer }),
  });
  return res.json();
}
