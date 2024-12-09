import axios from "axios";
import { Quiz } from "./types";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const BASE_API = `${REMOTE_SERVER}/api`;

const request = axios.create({
  withCredentials: true,
});

export const createQuiz = async (courseId: string, quiz: Partial<Quiz>) => {
  const response = await request.post(
    `${BASE_API}/courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await request.get(
    `${BASE_API}/courses/${courseId}/quizzes`
  );
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: Partial<Quiz>) => {
  const response = await request.put(
    `${BASE_API}/quizzes/${quizId}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await request.delete(
    `${BASE_API}/quizzes/${quizId}`
  );
  return response.data;
};

export const publishQuiz = async (quizId: string) => {
  const response = await request.put(
    `${BASE_API}/quizzes/${quizId}/publish`
  );
  return response.data;
};