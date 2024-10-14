import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/systems.jpg" width="100%" height={160} alt="Systems"/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS3034 Systems
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Systems Programming
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/meditation.jpg" width="100%" height={160} alt="Meditation"/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    GE1234 Meditation
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Finding Your Inner Peace
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/biology.jpg" width="100%" height={160} alt="Biology"/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    BIO1234 Biology
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    The Study of Life
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/architecture.jpg" width="100%" height={160} alt="Architecture"/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    AE1010 Building Materials
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    The Study of Building Materials
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/reactjs.png" width="100%" height={160} alt="ReactJS"/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack Software Developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/bow.jpg" width="100%" height={160} alt="Fashion"/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    FASH1234 Fashion Design
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    The Art of Accessorizing
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/stamps.jpg" width="100%" height={160} alt="Stamp"/>
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    ART1234 Stamp Making
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    The Art of Stamp Making
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div></div>

  );
}