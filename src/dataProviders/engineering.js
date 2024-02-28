import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const engineeringURL = {
  acceptServiceReport: id => `engineering/accept/${id}/`,
  rejectServiceReport: id => `engineering/reject/${id}/`,
  selfAssignReport: id => `engineering/self-assign/${id}/`,
};

const errorFetchingMsg = 'Error fetching data:';

async function acceptReport(id) {
  try {
    const response = await axiosInstance.post(engineeringURL.acceptServiceReport(id), {
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
    const response = await axiosInstance.post(engineeringURL.rejectServiceReport(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function selfAssignReport(id) {
  try {
    const response = await axiosInstance.post(engineeringURL.selfAssignReport(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

export {
  acceptReport,
  rejectReport,
  selfAssignReport,
};
