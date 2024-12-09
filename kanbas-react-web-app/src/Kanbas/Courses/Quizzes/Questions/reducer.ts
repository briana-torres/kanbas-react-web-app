import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { QuizQuestion } from './questionTypes';
import * as client from './client';

// Async thunks
export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (quizId: string) => {
    const response = await client.findQuestionsForQuiz(quizId);
    return response;
  }
);

export const createQuestion = createAsyncThunk(
  'questions/createQuestion',
  async ({ quizId, question }: { quizId: string; question: Partial<QuizQuestion> }) => {
    const response = await client.createQuestion(quizId, question);
    return response;
  }
);

export const updateQuestionThunk = createAsyncThunk(
  'questions/updateQuestion',
  async ({ questionId, question }: { questionId: string; question: Partial<QuizQuestion> }) => {
    const response = await client.updateQuestion(questionId, question);
    return response;
  }
);

export const deleteQuestionThunk = createAsyncThunk(
  'questions/deleteQuestion',
  async (questionId: string) => {
    await client.deleteQuestion(questionId);
    return questionId;
  }
);

interface QuestionsState {
  questions: QuizQuestion[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: QuestionsState = {
  questions: [],
  status: 'idle',
  error: null
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuizQuestion[]>) => {
      state.questions = action.payload;
      state.status = 'succeeded';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch questions';
      })
      // Create question
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      // Update question
      .addCase(updateQuestionThunk.fulfilled, (state, action) => {
        const index = state.questions.findIndex(q => q._id === action.payload._id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      // Delete question
      .addCase(deleteQuestionThunk.fulfilled, (state, action) => {
        state.questions = state.questions.filter(q => q._id !== action.payload);
      });
  }
});

export const { setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;