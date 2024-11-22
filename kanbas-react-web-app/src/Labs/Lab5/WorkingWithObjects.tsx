import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const [module, setModule] = useState({
    id: "123",
    name: "Module 1",
    description: "Introduction to Web Development",
    course: "Web Dev"
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input className="form-control w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />
      <h4>Working with Module</h4>
      <a href={MODULE_API_URL} className="btn btn-primary me-2">
        Get Module
      </a>
      <a href={`${MODULE_API_URL}/name`} className="btn btn-primary">
        Get Module Name
      </a>
      
      <h5 className="mt-3">Edit Module</h5>
      <input
        className="form-control w-75 mb-2"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        href={`${MODULE_API_URL}/name/${module.name}`}
        className="btn btn-success mb-2"
      >
        Update Module Name
      </a>

      <input
        className="form-control w-75 mb-2"
        value={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <a
        href={`${MODULE_API_URL}/description/${module.description}`}
        className="btn btn-success"
      >
        Update Module Description
      </a>
    </div>
  );
}

