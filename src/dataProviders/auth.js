import axios from 'axios';

const baseAccountsURL = 'http://127.0.0.1:8000/api/accounts/';

async function getUserById(id) {
  try {
    const response = await axios.get(`${baseAccountsURL}app-user/${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function loginUser(userData) {
  try {
    const response = await axios.post(`${baseAccountsURL}login/`, userData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function logoutUser() {
  try {
    const response = await axios.post(`${baseAccountsURL}logout/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function testToken(token) {
  try {
    await axios.post(`${baseAccountsURL}test-token/`, { token });
    return true;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}

export { getUserById, loginUser, logoutUser, testToken };
