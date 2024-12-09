import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import * as client from "./client";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursesNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import QuizList from './Quizzes/index';
import QuizEditor from './Quizzes/Editor';
import QuizDetails from './Quizzes/QuizDetails';
import QuizQuestions from './Quizzes/index';
import QuizStartScreen from './Quizzes/Preview/QuizStart';
import QuizSubmission from './Quizzes/Preview/QuizSubmission';
import QuizPreview from './Quizzes/Preview/index';
import QuizReview from './Quizzes/Preview/Review/index';

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (cid) {
      const users = await client.findUsersForCourse(cid);
      setUsers(users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div className="row">
      <div className="col-10">
        <h2 className="text-black">
          <FaAlignJustify className="me-3" />
          {course ? `${course.name} > ${pathname.split("/")[4] || "Home"}` : "Course Not Found"}
        </h2><br />
        <div className="row">
          <div className="col-md-3 col-lg-2 d-none d-md-block">
            <CoursesNavigation />
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Grades" element={<h1>Grades</h1>} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Quizzes">
              <Route index element={<QuizList />} />
              <Route path="new" element={<QuizEditor />} />
              <Route path=":qid" element={<QuizEditor />} />
              <Route path=":qid/details" element={<QuizDetails />} />
              <Route path=":qid/questions" element={<QuizQuestions />} />
              <Route path=":qid/preview" element={<QuizStartScreen />} /> 
              <Route path=":qid/preview/take" element={<QuizPreview />} />
              <Route path=":qid/preview/submitted" element={<QuizSubmission />} />
                <Route path=":qid/preview/review" element={<QuizReview />} />
              </Route>
              <Route path="People" element={<PeopleTable users={users} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
