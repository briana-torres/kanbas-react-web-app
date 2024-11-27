import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
export default function PeopleDetails() {
    const { uid } = useParams();
    const [user, setUser] = useState<any>({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        navigate(-1);
    };
    const saveUser = async () => {
        const updatedUser = { 
            ...user, 
            firstName,
            lastName,
            email: email || user.email,
            role: role || user.role
        };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        navigate(-1);
    };
    const startEditing = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setRole(user.role);
        setEditing(true);
    };
    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" /> </button>
            <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
            <div className="text-danger fs-4">
                {!editing && (
                    <FaPencil 
                        onClick={startEditing}
                        className="float-end fs-5 mt-2 wd-edit" 
                    />
                )}
                {editing && (
                    <FaCheck 
                        onClick={saveUser}
                        className="float-end fs-5 mt-2 me-2 wd-save" 
                    />
                )}
                {editing ? (
                    <div>
                        <input 
                            className="form-control w-75 wd-edit-first-name mb-2"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    saveUser();
                                }
                            }}
                        />
                        <input 
                            className="form-control w-75 wd-edit-last-name mb-3"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    saveUser();
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className="wd-name" onClick={startEditing}>
                        {user.firstName} {user.lastName}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <b>Email:</b>
                {!editing && (
                    <span className="wd-email ms-2">{user.email}</span>
                )}
                {editing && (
                    <input
                        type="email"
                        className="form-control w-75 wd-edit-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}
            </div>
            <div className="mb-3">
                <b>Role:</b>
                {!editing && (
                    <span className="wd-roles ms-2">{user.role}</span>
                )}
                {editing && (
                    <select
                        className="form-select w-75 wd-edit-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="STUDENT">Student</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                )}
            </div>
            <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
            <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
            <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
            <hr />
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete">
                Delete
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary float-start float-end me-2 wd-cancel">
                Cancel
            </button>
        </div>
    );
}