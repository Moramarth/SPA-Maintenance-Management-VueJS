import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const assignmentsURL = {
  allAssignments: 'supervisor/assignments/',
  singleAssignment: {
    details: id => `supervisor/assignments/${id}/`,
    edit: id => `supervisor/assignments/${id}/`,
    delete: id => `supervisor/assignments/${id}/`,
  },
  autoAssignServiceReports: 'supervisor/auto-assign/',
  createAssignment: id => `supervisor/assign-report/${id}/`,
  rejectServiceReport: id => `supervisor/reject-report/${id}/`,
};
const errorFetchingMsg = 'Error fetching data:';

async function getAssignments() {
  try {
    const response = await axiosInstance.get(assignmentsURL.allAssignments, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function getAssignmentById(id) {
  try {
    const response = await axiosInstance.get(assignmentsURL.singleAssignment.details(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function editAssignment(id, assignmentData) {
  try {
    const response = await axiosInstance.patch(assignmentsURL.singleAssignment.edit(id), assignmentData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function deleteAssignment(id) {
  try {
    const response = await axiosInstance.delete(assignmentsURL.singleAssignment.delete(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function createAssignment(assignmentData) {
  try {
    const response = await axiosInstance.post(assignmentsURL.createAssignment(assignmentData.service_report), assignmentData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function autoAssignReports() {
  try {
    const response = await axiosInstance.post(assignmentsURL.autoAssignServiceReports, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function rejectReport(id) {
  try {
    const response = await axiosInstance.post(assignmentsURL.rejectServiceReport(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

export { getAssignments, getAssignmentById, editAssignment, deleteAssignment, createAssignment, autoAssignReports, rejectReport };
