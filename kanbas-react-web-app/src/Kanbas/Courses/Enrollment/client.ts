import axios from "axios";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const BASE_API = `${REMOTE_SERVER}/api`;

export const toggleShowAllCourses = createAction("enrollment/toggleShowAllCourses");

// Fetch enrollments for a course
export const fetchEnrollments = createAsyncThunk(
  "enrollments/fetchEnrollments",
  async (courseId: string) => {
    const response = await axios.get(`${BASE_API}/courses/${courseId}/enrollments`);
    return response.data;
  }
);

// Enroll in a course
export const enrollInCourse = createAsyncThunk(
  "enrollments/enrollInCourse",
  async (payload: { userId: string; courseId: string }) => {
    const response = await axios.post(
      `${BASE_API}/courses/${payload.courseId}/enrollments`,
      { user: payload.userId }
    );
    return response.data;
  }
);

// Unenroll from a course
export const unenrollFromCourse = createAsyncThunk(
  "enrollments/unenrollFromCourse",
  async (payload: { userId: string; courseId: string }) => {
    await axios.delete(
      `${BASE_API}/courses/${payload.courseId}/enrollments`,
      { data: { user: payload.userId } }
    );
    return payload;
  }
);
