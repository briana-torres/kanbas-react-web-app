import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } from "./Courses/enrollmentReducer";

export default function Dashboard({
  courses, course, setCourse,
  addNewCourse, deleteCourse, updateCourse
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, showAllCourses } = useSelector((state: any) => 
    state.enrollmentReducer);
  const dispatch = useDispatch();
  const isStudent = currentUser?.role === "STUDENT";

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && 
        enrollment.course === courseId
    );
  };

  const handleEnrollment = (courseId: string) => {
    if (isEnrolled(courseId)) {
      dispatch(unenrollFromCourse({ 
        userId: currentUser._id, 
        courseId 
      }));
    } else {
      dispatch(enrollInCourse({ 
        userId: currentUser._id, 
        courseId 
      }));
    }
  };

  const coursesToShow = showAllCourses 
    ? courses 
    : courses.filter((course) => isEnrolled(course._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {isStudent && (
          <button
            className="btn btn-primary float-end"
            onClick={() => dispatch(toggleShowAllCourses())}
          >
            {showAllCourses ? "Show Enrolled" : "Show All Courses"}
          </button>
        )}
      </h1>
      <hr />
      {!isStudent && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse}
                    id="wd-update-course-click">
              Update
            </button>
          </h5>
          <input 
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea 
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      )}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({coursesToShow.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {coursesToShow.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card">
                {isStudent ? (
                  <div className="card-body">
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="text-decoration-none text-dark"
                    >
                      <img 
                        src={`/images/${course.image || "bow.jpg"}`} 
                        className="card-img-top"
                        style={{ height: "150px", objectFit: "cover" }}
                        alt={course.name}
                      />
                      <h5 className="card-title mt-2">{course.name}</h5>
                      <p className="card-text" style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>{course.description}</p>
                    </Link>
                    <div className="mt-2">
                      <button
                        onClick={() => handleEnrollment(course._id)}
                        className={`btn ${
                          isEnrolled(course._id)
                            ? "btn-danger"
                            : "btn-success"
                        }`}
                      >
                        {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                      </button>
                      {isEnrolled(course._id) && (
                        <Link
                          to={`/Kanbas/Courses/${course._id}/Home`}
                          className="btn btn-primary ms-2"
                        >
                          Go to Course
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="text-decoration-none text-dark"
                    >
                      <img 
                        src={`/images/${course.image || "bow.jpg"}`} 
                        className="card-img-top"
                        style={{ height: "150px", objectFit: "cover" }}
                        alt={course.name}
                      />
                    </Link>
                    <div className="card-body">
                      <Link
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="text-decoration-none text-dark"
                      >
                        <h5 className="card-title">{course.name}</h5>
                        <p className="card-text" style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>{course.description}</p>
                      </Link>
                      <div className="mt-2">
                        <Link
                          to={`/Kanbas/Courses/${course._id}/Home`}
                          className="btn btn-primary"
                        >
                          Go
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning float-end ms-2"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
