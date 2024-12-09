import axios from "axios";
import { QuizQuestion } from "./questionTypes";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const BASE_API = `${REMOTE_SERVER}/api`;

const request = axios.create({
  withCredentials: true,
});

export const createQuestion = async (quizId: string, question: Partial<QuizQuestion>) => {
  const response = await request.post(
    `${BASE_API}/quizzes/${quizId}/questions`,
    question
  );
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  console.log("Fetching questions for quiz ID:", quizId);
  try {
    const response = await request.get(
      `${BASE_API}/quizzes/${quizId}/questions`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const findQuestionById = async (questionId: string) => {
  const response = await request.get(
    `${BASE_API}/questions/${questionId}`
  );
  return response.data;
};

export const updateQuestion = async (questionId: string, question: Partial<QuizQuestion>) => {
  const response = await request.put(
    `${BASE_API}/questions/${questionId}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await request.delete(
    `${BASE_API}/questions/${questionId}`
  );
  return response.data;
};

export const reorderQuestions = async (quizId: string, questionOrders: { questionId: string; order: number }[]) => {
  const response = await request.put(
    `${BASE_API}/quizzes/${quizId}/questions/reorder`,
    { questionOrders }
  );
  return response.data;
};