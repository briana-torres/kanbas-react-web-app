import { Routes, Route, Navigate } from "react-router";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursesNavigation from "./Navigation";
import KanbasNavigation from "../Navigation"; // Assuming you have this component
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";

export default function Courses() {
  return (
    <div className="row">
      <div className="col-10">
        <h2 className="text-danger">
          <FaAlignJustify className="me-2" />
          Course 1234
        </h2>
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
