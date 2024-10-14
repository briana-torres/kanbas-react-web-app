export default function AssignmentEditor() {
  return (
    <div className="container" id="wd-assignments-editor">
      <h3>Assignment Name</h3>
      <input className="form-control mb-2" id="wd-name" value="A1" />
      
      <textarea className="form-control mb-4" rows={5} id="wd-description">
        The assignment is available online
        Submit a link to the landing page of your Web application running on Netlify.
        The landing page should include the following:
        • Your full name and section
        • Links to each of the lab assignments
        • Link to the Kanbas application
        • Links to all relevant source code repositories
        The Kanbas application should include a link to navigate back to the landing page.
      </textarea>
      
      <div className="row mb-2">
        <div className="col-3">
          <label htmlFor="wd-points" className="float-end">Points</label>
        </div>
        <div className="col-9">
          <input className="form-control" id="wd-points" value="100" />
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
          <input className="form-control" id="wd-assign-to" value="Everyone" />
          <div className="mt-2">Due</div>
          <input type="datetime-local" className="form-control" id="wd-due-date" value="2024-05-13T23:59" />
        </div>
      </div>
      
      <div className="row mb-2">
        <div className="col-3"></div>
        <div className="col-9">
          <div className="row">
            <div className="col-6">
              <div>Available from</div>
              <input type="datetime-local" className="form-control" id="wd-available-from" value="2024-05-06T00:00" />
            </div>
            <div className="col-6">
              <div>Until</div>
              <input type="datetime-local" className="form-control" id="wd-available-until" value="2024-05-20T23:59" />
            </div>
          </div>
        </div>
      </div>
      
      <hr />
      <button className="btn btn-secondary me-2">Cancel</button>
      <button className="btn btn-danger">Save</button>
    </div>
  );
}
