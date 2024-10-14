import { FaPlus } from "react-icons/fa6";
import { GoCircleSlash } from "react-icons/go";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="d-flex flex-wrap justify-content-end align-items-center">
      <button id="wd-collapse-all" className="btn btn-sm btn-secondary me-1 mb-1 d-flex align-items-center">
        Collapse All
      </button>
      <button id="wd-view-progress" className="btn btn-sm btn-secondary me-1 mb-1 d-flex align-items-center">
        View Progress
      </button>
      <div className="dropdown d-inline-block me-1 mb-1">
        <button id="wd-publish-all-btn" className="btn btn-sm btn-secondary dropdown-toggle d-flex align-items-center"
          type="button" data-bs-toggle="dropdown">
          <span className="position-relative me-1">
            <FaCheckCircle className="text-success position-absolute" style={{ fontSize: '1.1em', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            <FaCircle className="text-white" style={{ fontSize: '0.9em' }} />
          </span>
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li><a id="wd-publish-all-modules-and-items-btn" className="dropdown-item d-flex align-items-center" href="#">
            <span className="position-relative me-1">
              <FaCheckCircle className="text-success position-absolute" style={{ fontSize: '1.1em', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              <FaCircle className="text-white" style={{ fontSize: '0.9em' }} />
            </span>
            Publish all modules and items
          </a></li>
          <li><a id="wd-publish-modules-only-button" className="dropdown-item d-flex align-items-center" href="#">
            <span className="position-relative me-1">
              <FaCheckCircle className="text-success position-absolute" style={{ fontSize: '1.1em', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              <FaCircle className="text-white" style={{ fontSize: '0.9em' }} />
            </span>
            Publish modules only
          </a></li>
          <li><a id="wd-unpublish-all-modules-and-items" className="dropdown-item d-flex align-items-center" href="#">
            <GoCircleSlash className="me-1" />
            Unpublish all modules and items
          </a></li>
          <li><a id="wd-unpublish-modules-only" className="dropdown-item d-flex align-items-center" href="#">
            <GoCircleSlash className="me-1" />
            Unpublish modules only
          </a></li>
        </ul>
      </div>
      <button id="wd-add-module-btn" className="btn btn-sm btn-danger mb-1 d-flex align-items-center">
        <FaPlus className="me-1" /> Module
      </button>
    </div>
  );
}
