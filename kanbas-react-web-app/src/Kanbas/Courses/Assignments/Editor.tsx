import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment, addAssignment } from "./reducer";
import * as assignmentClient from "./client";
import * as courseClient from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a: any) => a._id === aid);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: "100",
    due: "",
    available: "",
    until: "",
    course: cid,
  });

  useEffect(() => {
    if (assignment) {
      const formattedAssignment = {
        ...assignment,
        due: assignment.due?.split('T')[0] || "",
        available: assignment.available?.split('T')[0] || "",
        until: assignment.until?.split('T')[0] || ""
      };
      setFormData(formattedAssignment);
    }
  }, [assignment]);

  const handleSubmit = async () => {
    const submissionData = {
      ...formData,
      _id: aid || Date.now().toString(),
    };

    try {
      if (aid) {
        const updatedAssignment = await assignmentClient.updateAssignment(submissionData);
        dispatch(updateAssignment(updatedAssignment));
      } else {
        const newAssignment = await courseClient.createAssignmentForCourse(cid as string, submissionData);
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
          onChange={(e) => setFormData({ ...formData, points: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          value={formData.due}
          onChange={(e) => setFormData({ ...formData, due: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Available From</label>
        <input
          type="date"
          className="form-control"
          value={formData.available}
          onChange={(e) => setFormData({ ...formData, available: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Available Until</label>
        <input
          type="date"
          className="form-control"
          value={formData.until}
          onChange={(e) => setFormData({ ...formData, until: e.target.value })}
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
