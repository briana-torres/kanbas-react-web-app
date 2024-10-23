import { useParams, Link } from "react-router-dom";
import { assignments } from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find(a => a._id === aid);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div className="container" id="wd-assignments-editor">
      <h3>Assignment Name</h3>
      <input className="form-control mb-2" id="wd-name" value={assignment.title} readOnly />
      
      <textarea className="form-control mb-4" rows={5} id="wd-description" value={assignment.description} readOnly />
      
      <div className="row mb-2">
        <div className="col-3">
          <label htmlFor="wd-points" className="float-end">Points</label>
        </div>
        <div className="col-9">
          <input className="form-control" id="wd-points" value={assignment.points} readOnly />
        </div>
      </div>
      
      <div className="row mb-2">
        <div className="col-3">
          <label htmlFor="wd-group" className="float-end">Assignment Group</label>
        </div>
        <div className="col-9">
          <select className="form-select">
            <option value="VAL1">ASSIGNMENTS</option>
          </select>
        </div>
      </div>
      
      <div className="row mb-2">
        <div className="col-3">
          <label htmlFor="wd-submission-type" className="float-end">Submission Type</label>
        </div>
        <div className="col-9">
          <select className="form-select">
            <option value="VAL1">Online</option>
          </select>
        </div>
      </div>
      
      <div className="row mb-2">
        <div className="col-3">
          <label className="float-end">Online Entry Options</label>
        </div>
        <div className="col-9">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-website-url" checked />
            <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
          </div>
          {/* ... Other checkboxes ... */}
        </div>
      </div>
      
      <div className="row mb-2">
        <div className="col-3">
          <label htmlFor="wd-assign-to" className="float-end">Assign</label>
        </div>
        <div className="col-9">
          <div className="mb-1">Assign to</div>
          <input className="form-control" id="wd-assign-to" value="Everyone" readOnly />
          <div className="mt-2">Due</div>
          <input type="datetime-local" className="form-control" id="wd-due-date" value={assignment.dueDate} readOnly />
        </div>
      </div>
      
      <div className="row mb-2">
        <div className="col-3"></div>
        <div className="col-9">
          <div className="row">
            <div className="col-6">
              <div>Available from</div>
              <input type="datetime-local" className="form-control" id="wd-available-from" value={assignment.availableFromDate} readOnly />
            </div>
            <div className="col-6">
              <div>Until</div>
              <input type="text" className="form-control" id="wd-available-until" readOnly />
            </div>
          </div>
        </div>
      </div>
      
      <hr />
      <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
      <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
    </div>
  );
}
