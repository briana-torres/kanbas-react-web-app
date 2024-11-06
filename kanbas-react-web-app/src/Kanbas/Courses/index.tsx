import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import { courses } from "../Database";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursesNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";

export default function Courses() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

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
              <Route path="Quizzes" element={<h1>Quizzes</h1>} />
              <Route path="People" element={<PeopleTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
