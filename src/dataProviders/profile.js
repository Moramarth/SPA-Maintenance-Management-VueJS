import axios from 'axios';
import { authHeaders } from '../helpers/authValidation';

const apiURL = 'http://127.0.0.1:8000/api/accounts/profiles/';

async function getProfiles() {
  try {
    const response = await axios.get(apiURL, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getProfileById(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/`, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}
async function editProfile(id, profileData) {
  try {
    const response = await axios.patch(`${apiURL}${id}/`, profileData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
}

export { getProfiles, getProfileById, editProfile };
