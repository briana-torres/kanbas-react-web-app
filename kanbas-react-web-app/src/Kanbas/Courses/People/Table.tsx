import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import * as db from "../../Database";

export default function PeopleTable() {
  const { cid } = useParams();
  const { enrollments } = db;

  return (
    <div id="wd-people-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {enrollments
            .filter((enrollment) => enrollment.course === cid)
            .map((enrollment) => (
              <tr key={enrollment._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{enrollment.firstName}</span>{" "}
                  <span className="wd-last-name">{enrollment.lastName}</span>
                </td>
                <td className="wd-login-id">{enrollment.loginId}</td>
                <td className="wd-section">{enrollment.section}</td>
                <td className="wd-role">{enrollment.role.toUpperCase()}</td>
                <td className="wd-last-activity">{enrollment.lastActivity}</td>
                <td className="wd-total-activity">{enrollment.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
