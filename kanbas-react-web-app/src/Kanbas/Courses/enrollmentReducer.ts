import { createSlice } from "@reduxjs/toolkit";
import * as client from "./enrollmentClient";

const initialState = {
  enrollments: [] as any[],
  showAllCourses: false,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload as any[];
    },
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    addEnrollment: (state, action) => {
      state.enrollments.push(action.payload as any);
    },
    removeEnrollment: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === action.payload.userId && 
            enrollment.course === action.payload.courseId)
      );
    },
  },
});

export const { setEnrollments, toggleShowAllCourses, 
               addEnrollment, removeEnrollment } = enrollmentSlice.actions;

// Thunks for API integration
export const fetchEnrollments = () => async (dispatch: any) => {
  const enrollments = await client.findAllEnrollments();
  dispatch(setEnrollments(enrollments));
};

export const enrollInCourseThunk = 
  (userId: string, courseId: string) => async (dispatch: any) => {
    const enrollment = await client.enrollInCourse(userId, courseId);
    dispatch(addEnrollment(enrollment));
};

export const unenrollFromCourseThunk = 
  (userId: string, courseId: string) => async (dispatch: any) => {
    await client.unenrollFromCourse(userId, courseId);
    dispatch(removeEnrollment({ userId, courseId }));
};

export default enrollmentSlice.reducer; 