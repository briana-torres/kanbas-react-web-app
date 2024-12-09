import { Link } from "react-router-dom";

export default function TOC() {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link id="wd-a" to="#/Homepage" className="nav-link">
          Homepage
        </Link>
      </li>
      <li className="nav-item">
        <Link id="wd-k" to="/Kanbas" className="nav-link">
          Kanbas
        </Link>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/briana-torres/kanbas-react-web-app" className="nav-link">
          Web App Repo
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/briana-torres/kanbas-node-server-app" className="nav-link">
          Server App Repo
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://kanbas-node-server-app-3qhi.onrender.com" className="nav-link">
          Link to Server 
        </a>
      </li>
    </ul>
  );
}