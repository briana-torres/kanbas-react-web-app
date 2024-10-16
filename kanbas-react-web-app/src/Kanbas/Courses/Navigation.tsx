import { Link, useParams, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link to={`/Kanbas/Courses/${cid}/Home`} id="wd-course-home-link"
        className={`list-group-item border border-0 ${pathname.includes("Home") ? "active" : "text-danger"}`}> Home </Link>
      <Link to={`/Kanbas/Courses/${cid}/Modules`} id="wd-course-modules-link"
        className={`list-group-item border border-0 ${pathname.includes("Modules") ? "active" : "text-danger"}`}> Modules </Link>
      <Link to={`/Kanbas/Courses/${cid}/Piazza`} id="wd-course-piazza-link"
        className="list-group-item text-danger border border-0"> Piazza </Link>
      <Link to={`/Kanbas/Courses/${cid}/Zoom`} id="wd-course-zoom-link"
        className="list-group-item text-danger border border-0"> Zoom </Link>
      <Link to={`/Kanbas/Courses/${cid}/Assignments`} id="wd-course-assignments-link"
        className={`list-group-item border border-0 ${pathname.includes("Assignments") ? "active" : "text-danger"}`}> Assignments </Link>
      <Link to={`/Kanbas/Courses/${cid}/Quizzes`} id="wd-course-quizzes-link"
        className="list-group-item text-danger border border-0"> Quizzes </Link>
      <Link to={`/Kanbas/Courses/${cid}/Grades`} id="wd-course-grades-link"
        className={`list-group-item border border-0 ${pathname.includes("Grades") ? "active" : "text-danger"}`}> Grades </Link>
      <Link to={`/Kanbas/Courses/${cid}/People`} id="wd-course-people-link"
        className="list-group-item text-danger border border-0"> People </Link>
    </div>
  );
}
