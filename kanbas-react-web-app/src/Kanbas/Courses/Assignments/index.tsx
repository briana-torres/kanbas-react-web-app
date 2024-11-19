import { useParams, Link, useNavigate } from "react-router-dom";
import { BsSearch, BsPlusCircleFill, BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { FaTrash, FaPencil } from "react-icons/fa6";
import AssignmentDeleteDialog from "./AssignmentDeleteDialog";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const navigate = useNavigate();

  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const handleDeleteClick = (assignment: any) => {
    setSelectedAssignment(assignment);
  };

  const handleConfirmDelete = () => {
    if (selectedAssignment) {
      dispatch(deleteAssignment(selectedAssignment._id));
    }
    setSelectedAssignment(null);
  };

  return (
    <>
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
            {isFaculty && (
              <div>
                <button className="btn btn-secondary me-2">
                  <BsPlusCircleFill className="me-1" /> Group
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/new`)}
                >
                  <BsPlusCircleFill className="me-1" /> Assignment
                </button>
              </div>
            )}
          </div>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
              <span className="fw-bold">ASSIGNMENTS</span>
              <span>40% of Total</span>
            </li>
            {courseAssignments.map((assignment: any) => (
              <li key={assignment._id} className="list-group-item d-flex border-0 border-start border-success border-5">
                <div className="me-3 d-flex align-items-center">
                  <BsGripVertical />
                  <i className="far fa-file-alt text-success fs-4 ms-2"></i>
                </div>
                <div className="flex-grow-1">
                  <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="text-decoration-none text-dark">
                    <div className="fw-bold">{assignment.title}</div>
                    <div className="text-secondary">
                      <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not available until</span> {formatDate(assignment.availableFromDate)} |
                    </div>
                    <div className="text-secondary">
                      <span className="fw-bold">Due</span> {formatDate(assignment.dueDate)} | {assignment.points} pts
                    </div>
                  </Link>
                </div>
                <div className="d-flex align-items-center">
                  <GreenCheckmark />
                  {isFaculty && (
                    <>
                      <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                        <FaPencil className="text-primary ms-2" />
                      </Link>
                      <FaTrash
                        className="text-danger ms-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteClick(assignment)}
                        data-bs-toggle="modal" 
                        data-bs-target="#wd-delete-assignment-dialog"
                      />
                    </>
                  )}
                  <IoEllipsisVertical className="ms-2 fs-4" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedAssignment && (
        <AssignmentDeleteDialog
          assignmentTitle={selectedAssignment.title}
          deleteAssignment={handleConfirmDelete}
        />
      )}
    </>
  );
}
