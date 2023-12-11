import axios from 'axios';

async function getProfiles() {
  const apiURL = 'http://127.0.0.1:8000/api/accounts/profiles/';
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getProfileById(id) {
  const apiURL = `http://127.0.0.1:8000/api/accounts/profiles/${id}/`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}
async function editProfile(id, profileData) {
  const apiURL = `http://127.0.0.1:8000/api/accounts/profiles/${id}/`;
  try {
    const response = await axios.patch(apiURL, profileData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
}

export { getProfiles, getProfileById, editProfile };
