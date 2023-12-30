import axios from 'axios';
import { useUsersStore } from '../stores/usersStore';
import { authHeaders } from '../helpers/authValidation';

const baseAccountsURL = 'http://127.0.0.1:8000/api/accounts/';
async function getCurrentLoggedUser(accessToken) {
  try {
    const response = await axios.get(`${baseAccountsURL}app-user/current/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function getUserById(id) {
  try {
    const response = await axios.get(`${baseAccountsURL}app-user/${id}/`, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function loginUser(userData) {
  try {
    const response = await axios.post(`${baseAccountsURL}token/`, userData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function testToken(token) {
  try {
    await axios.post(`${baseAccountsURL}token/verify/`, { token });
    return true;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}

async function refreshAPIToken(token) {
  try {
    const response = await axios.post(`${baseAccountsURL}token/refresh/`, {
      refresh: token,
    });

    const userStore = useUsersStore();
    userStore.setAccessToken(response.data.access);
  }
  catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { getUserById, loginUser, testToken, getCurrentLoggedUser, refreshAPIToken };
