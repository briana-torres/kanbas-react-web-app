import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const newAssignment = {
        ...payload,
        _id: `A${new Date().getTime()}`,
        dueDate: new Date(payload.dueDate).toISOString().slice(0, 19),
        availableFromDate: new Date(payload.availableFromDate).toISOString().slice(0, 19),
        availableUntilDate: new Date(payload.availableUntilDate).toISOString().slice(0, 19),
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload }) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== payload
      );
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === payload._id ? {
          ...payload,
          dueDate: new Date(payload.dueDate).toISOString().slice(0, 19),
          availableFromDate: new Date(payload.availableFromDate).toISOString().slice(0, 19),
          availableUntilDate: new Date(payload.availableUntilDate).toISOString().slice(0, 19),
        } : assignment
      );
    },
    setAssignmentEditing: (state, { payload }) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === payload ? { ...assignment, editing: true } : assignment
      );
    },
  },
});

export const { 
  addAssignment, 
  deleteAssignment, 
  updateAssignment,
  setAssignmentEditing 
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer; 