import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="/images/systems.jpg" alt="" width={200} />
            <div>
              <h5>CS3034 Systems</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="/images/meditation.jpg" alt="" width={200}/>
            <div>
              <h5>GE1234 Meditation</h5>
              <p className="wd-dashboard-course-title">
                Finding your inner peace
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="/images/biology.jpg" alt="" width={200} />
            <div>
              <h5>BI1200 Biology</h5>
              <p className="wd-dashboard-course-title">
                Understanding the Animal Kingdom
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="/images/architecture.jpg" alt="" width={200} />
            <div>
              <h5>AE1010 Building Materials</h5>
              <p className="wd-dashboard-course-title">
                House construction materials
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="/images/reactjs.png" alt="" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="/images/garden.jpg" alt="" width={200} />
            <div>
              <h5>GD4034 Advanced Gardening</h5>
              <p className="wd-dashboard-course-title">
                How to grow indoor plants
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="/images/shopping.jpg" alt="" width={200} />
            <div>
              <h5>GE2234 Shopping</h5>
              <p className="wd-dashboard-course-title">
                How to shop for every season
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}