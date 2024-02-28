import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const meetingsURL = {
  allMeetings: 'contractors/meetings/',
  singleMeeting: {
    details: id => `contractors/meetings/${id}/`,
    edit: id => `contractors/meetings/${id}/`,
    delete: id => `contractors/meetings/${id}/`,
  },
};

const errorFetchingMsg = 'Error fetching data:';

async function getMeetings() {
  try {
    const response = await axiosInstance.get(meetingsURL.allMeetings, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function getMeetingById(id) {
  try {
    const response = await axiosInstance.get(meetingsURL.singleMeeting.details(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function editMeeting(id, meetingData) {
  try {
    const response = await axiosInstance.patch(meetingsURL.singleMeeting.edit(id), meetingData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function deleteMeeting(id) {
  try {
    const response = await axiosInstance.delete(meetingsURL.singleMeeting.delete(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function createMeeting(meetingData) {
  try {
    const response = await axiosInstance.post(meetingsURL.allMeetings, meetingData, {
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
  createMeeting,
  getMeetings,
  getMeetingById,
  editMeeting,
  deleteMeeting,
};
