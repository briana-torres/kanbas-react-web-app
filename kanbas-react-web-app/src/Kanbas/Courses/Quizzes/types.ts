export interface Quiz {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points: number;
  dueDate: Date;
  availableFromDate: Date;
  availableUntilDate: Date;
  published: boolean;
  numberOfQuestions: number;
  quizType: 'GRADED_QUIZ' | 'PRACTICE_QUIZ' | 'GRADED_SURVEY' | 'UNGRADED_SURVEY';
  assignmentGroup: 'QUIZZES' | 'EXAMS' | 'ASSIGNMENTS' | 'PROJECT';
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  numberOfAttempts: number;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
}

export interface QuizForm extends Omit<Quiz, '_id' | 'course'> {}

export interface QuizRootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
  accountReducer: {
    currentUser: {
      role: string;
    };
  };
}