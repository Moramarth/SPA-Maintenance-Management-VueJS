import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const profileURLs = {
  allProfiles: 'accounts/profiles/',
  singleProfile: {
    details: id => `accounts/profiles/${id}/`,
    edit: id => `accounts/profiles/${id}/`,
  },
};
const errorFetchingMsg = 'Error fetching data:';

async function getProfiles() {
  try {
    const response = await axiosInstance.get(profileURLs.allProfiles, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function getProfileById(id) {
  try {
    const response = await axiosInstance.get(profileURLs.singleProfile.details(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}
async function editProfile(id, profileData) {
  try {
    const response = await axiosInstance.patch(profileURLs.singleProfile.edit(id), profileData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return error;
  }
}

export { getProfiles, getProfileById, editProfile };
