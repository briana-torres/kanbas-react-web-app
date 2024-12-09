import { QuizSubmission } from "./QuizSubmissionType";

const API_BASE = process.env.REACT_APP_REMOTE_SERVER;

export const createSubmission = async (quizId: string, submission: Partial<QuizSubmission>) => {
  const response = await fetch(`${API_BASE}/api/quizzes/${quizId}/submit`, {
    method: "POST",
    body: JSON.stringify(submission),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const fetchSubmissions = async (quizId: string, studentId: string) => {
  const response = await fetch(`${API_BASE}/api/quizzes/${quizId}/submissions/${studentId}`);
  return response.json();
};

export const fetchSubmissionById = async (submissionId: string) => {
  const response = await fetch(`${API_BASE}/api/submissions/${submissionId}`);
  return response.json();
};

export const updateSubmissionScores = async (submissionId: string, updates: any) => {
  const response = await fetch(`${API_BASE}/api/submissions/${submissionId}/scores`, {
    method: "PUT",
    body: JSON.stringify({ updates, role: updates.role }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};