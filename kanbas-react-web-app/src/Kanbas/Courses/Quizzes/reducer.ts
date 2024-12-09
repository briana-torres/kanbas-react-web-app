import { createSlice } from "@reduxjs/toolkit";
import { Quiz } from "./types";

const initialState = {
  quizzes: [] as Quiz[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes.push(quiz);
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(quiz => quiz._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map(q =>
        q._id === quiz._id ? quiz : q
      );
    },
    togglePublishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map(q =>
        q._id === quizId ? { ...q, published: !q.published } : q
      );
    }
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  togglePublishQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;