import { Navigate, Route, Routes } from "react-router";
import { useState, useEffect } from "react";
import Account from "./Account";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector } from "react-redux";
import CourseProtectedRoute from "./Courses/CourseProtectedRoute";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/bow.jpg",
    description: "New Description"
  });

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  const updateCourse = async () => {
    try {
      const status = await courseClient.updateCourse(course);
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={
            <ProtectedRoute>
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={isFaculty ? addNewCourse : () => {}}
                deleteCourse={isFaculty ? deleteCourse : () => {}}
                updateCourse={isFaculty ? updateCourse : () => {}}
              />
            </ProtectedRoute>
          } />
          <Route path="/Courses/:cid/*" element={
            <CourseProtectedRoute>
              <Courses courses={courses} />
            </CourseProtectedRoute>
          } />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}