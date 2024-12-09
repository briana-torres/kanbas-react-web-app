import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";
import { QuizSubmission, SubmissionState } from "./QuizSubmissionType";

export const submitQuiz = createAsyncThunk(
  "submissions/submitQuiz",
  async ({ quizId, submission }: { quizId: string; submission: Partial<QuizSubmission> }) => {
    const response = await client.createSubmission(quizId, submission);
    return response;
  }
);

export const fetchSubmissions = createAsyncThunk(
  "submissions/fetchSubmissions",
  async ({ quizId, studentId }: { quizId: string; studentId: string }) => {
    const response = await client.fetchSubmissions(quizId, studentId);
    return response;
  }
);

export const fetchSubmissionById = createAsyncThunk(
  "submissions/fetchSubmissionById",
  async (submissionId: string) => {
    const response = await client.fetchSubmissionById(submissionId);
    return response;
  }
);

export const updateScores = createAsyncThunk(
  "submissions/updateScores",
  async ({ submissionId, updates }: { submissionId: string; updates: any }) => {
    const response = await client.updateSubmissionScores(submissionId, updates);
    return response;
  }
);

const initialState: SubmissionState = {
  submissions: [],
  currentSubmission: null,
  status: 'idle',
  error: null
};

const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    clearCurrentSubmission: (state) => {
      state.currentSubmission = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Quiz
      .addCase(submitQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissions.push(action.payload);
        state.currentSubmission = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      
      // Fetch Submissions
      .addCase(fetchSubmissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      
      // Fetch Single Submission
      .addCase(fetchSubmissionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubmissionById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSubmission = action.payload;
      })
      .addCase(fetchSubmissionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      
      // Update Scores
      .addCase(updateScores.fulfilled, (state, action) => {
        state.currentSubmission = action.payload;
        const index = state.submissions.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.submissions[index] = action.payload;
        }
      });
  },
});

export const { clearCurrentSubmission } = submissionsSlice.actions;

export default submissionsSlice.reducer;