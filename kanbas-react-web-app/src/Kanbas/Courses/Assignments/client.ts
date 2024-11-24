import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const createAssignment = async (assignment: any) => {
  const response = await axios.post(
    `${ASSIGNMENTS_API}`, 
    assignment
  );
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`);
  return response.data;
};

export const updateAssignment = async (aid: string, assignment: any) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${aid}`, 
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (aid: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${aid}`);
  return response.data;
}; 