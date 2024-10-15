import { BsSearch, BsPlusCircleFill } from "react-icons/bs";
import { BsGripVertical } from "react-icons/bs";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link} from "react-router-dom";

export default function Assignments() {
  return (
    <div className="d-flex flex-column flex-lg-row">
      <div className="flex-fill">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="flex-grow-1 me-2">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <BsSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for Assignment"
              />
            </div>
          </div>
          <div>
            <button className="btn btn-secondary me-2">
              <BsPlusCircleFill className="me-1" /> Group
            </button>
            <button className="btn btn-danger">
              <BsPlusCircleFill className="me-1" /> Assignment
            </button>
          </div>
        </div>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
            <span className="fw-bold">ASSIGNMENTS</span>
            <span>40% of Total</span>
          </li>
          {["A1", "A2", "A3"].map((assignment, index) => (
            <li key={index} className="list-group-item d-flex border-0 border-start border-success border-5">
              <div className="me-3 d-flex align-items-center">
                <BsGripVertical />
                <i className="far fa-file-alt text-success fs-4 ms-2"></i>
              </div>
              <div className="flex-grow-1">
                <Link to={`Editor`} className="text-decoration-none text-dark">
                  <div className="fw-bold">{assignment}</div>
                  <div className="text-secondary">
                    Multiple Modules | Not available until May {6 + index * 7} at 12:00am |
                    <br />
                    Due May {13 + index * 7} at 11:59pm | 100 pts
                  </div>
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <GreenCheckmark />
                <IoEllipsisVertical className="ms-2 fs-4" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
