import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment, addAssignment } from "./reducer";
import * as client from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a: any) => a._id === aid);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: new Date().toISOString().slice(0, 16),
    availableUntilDate: new Date().toISOString().slice(0, 16),
    course: cid,
  });

  useEffect(() => {
    if (assignment) {
      const formattedAssignment = {
        ...assignment,
        dueDate: assignment.dueDate.slice(0, 16),
        availableFromDate: assignment.availableFromDate.slice(0, 16),
        availableUntilDate: assignment.availableUntilDate?.slice(0, 16) || new Date().toISOString().slice(0, 16)
      };
      setFormData(formattedAssignment);
    }
  }, [assignment]);

  const handleSubmit = async () => {
    const submissionData = {
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
      availableFromDate: new Date(formData.availableFromDate).toISOString(),
      availableUntilDate: new Date(formData.availableUntilDate).toISOString()
    };

    try {
      if (aid) {
        await client.updateAssignment(aid, submissionData);
        dispatch(updateAssignment({ ...submissionData, _id: aid }));
      } else {
        const newAssignment = await client.createAssignment(submissionData);
        dispatch(addAssignment(newAssignment));
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  return (
    <div className="container" id="wd-assignments-editor">
      <h3>{aid ? "Edit Assignment" : "Add Assignment"}</h3>
      
      <div className="mb-3">
        <label className="form-label">Assignment Name</label>
        <input
          className="form-control"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={5}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Points</label>
        <input
          type="number"
          className="form-control"
          value={formData.points}
          onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="datetime-local"
          className="form-control"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Available From</label>
        <input
          type="datetime-local"
          className="form-control"
          value={formData.availableFromDate}
          onChange={(e) => setFormData({ ...formData, availableFromDate: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Available Until</label>
        <input
          type="datetime-local"
          className="form-control"
          value={formData.availableUntilDate}
          onChange={(e) => setFormData({ ...formData, availableUntilDate: e.target.value })}
        />
      </div>

      <hr />
      <Link to={`/Kanbas/Courses/${cid}/Assignments`} 
            className="btn btn-secondary me-2">
        Cancel
      </Link>
      <button onClick={handleSubmit} className="btn btn-danger">
        {aid ? "Save" : "Add"} Assignment
      </button>
    </div>
  );
}
