import { Quiz } from "../types"

export interface QuizQuestion {
  _id: string;
  quizId: string;
  courseId: string;
  title: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK';
  points: number;
  question: string;
  order: number;
  // For multiple choice questions
  choices?: {
    text: string;
    isCorrect: boolean;
  }[];
  // For true/false questions
  correctAnswer?: boolean;
  // For fill in the blank questions
  correctAnswers?: {
    text: string;
    caseSensitive: boolean;
  }[];
}

export interface QuizQuestionForm extends Omit<QuizQuestion, '_id' | 'quizId' | 'courseId'> {}

export interface QuizQuestionRootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
  questionsReducer: {
    questions: QuizQuestion[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  accountReducer: {
    currentUser: {
      role: string;
    };
  };
}