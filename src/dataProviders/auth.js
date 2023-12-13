import axios from 'axios';

async function getUserById(id) {
  const apiURL = `http://127.0.0.1:8000/api/accounts/app-user/${id}/`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function loginUser(userData) {
  const apiURL = `http://127.0.0.1:8000/api/accounts/login/`;
  try {
    const response = await axios.post(apiURL, userData);
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function logoutUser() {
  const apiURL = `http://127.0.0.1:8000/api/accounts/logout/`;
  try {
    const response = await axios.post(apiURL, { withCredentials: true });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function testToken(token) {
  const apiURL = `http://127.0.0.1:8000/api/accounts/test-token/`;
  try {
    await axios.post(apiURL, { token, withCredentials: true });
    return true;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}

export { getUserById, loginUser, logoutUser, testToken };
