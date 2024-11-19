import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
  showAllCourses: false,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollInCourse: (state, action) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: action.payload.userId,
        course: action.payload.courseId,
      };
      state.enrollments.push(newEnrollment);
    },
    unenrollFromCourse: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === action.payload.userId && 
            enrollment.course === action.payload.courseId)
      );
    },
  },
});

export const { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } = 
  enrollmentSlice.actions;
export default enrollmentSlice.reducer; 