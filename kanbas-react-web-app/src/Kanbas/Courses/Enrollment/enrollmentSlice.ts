import { createSlice } from '@reduxjs/toolkit';
import { EnrollmentState } from './types';
import { enrollInCourse, unenrollFromCourse, fetchEnrollments } from './client';

const initialState: EnrollmentState = {
  enrollments: [],
  showAllCourses: false
};

export const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    toggleShowAllCourses(state) {
      state.showAllCourses = !state.showAllCourses;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        const newEnrollments = action.payload;
        newEnrollments.forEach((newEnroll: any) => {
          const exists = state.enrollments.some(
            e => e.user === newEnroll.user && e.course === newEnroll.course
          );
          if (!exists) {
            state.enrollments.push(newEnroll);
          }
        });
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.enrollments.push(action.payload);
      })
      .addCase(unenrollFromCourse.fulfilled, (state, action) => {
        const { userId, courseId } = action.payload;
        state.enrollments = state.enrollments.filter(
          enrollment =>
            !(enrollment.user === userId &&
              enrollment.course === courseId)
        );
      });
  }
});

export const { toggleShowAllCourses } = enrollmentSlice.actions;
export const enrollmentReducer = enrollmentSlice.reducer;
export default enrollmentSlice.reducer;