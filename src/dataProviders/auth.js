import { useUsersStore } from '../stores/usersStore';
import { authHeaders } from '../helpers/authValidation';
import { tokenKeyword } from '../constants/tokenKeyword';
import { axiosInstance } from './axiosInstance';

const accountsURLs = {
  appuser: {
    currentUser: 'accounts/app-user/current/',
    getSingleUser: id => `accounts/app-user/${id}/`,
  },
  token: {
    access: 'accounts/token/',
    refresh: 'accounts/token/refresh/',
    verify: 'accounts/token/verify/',
  },
};

const errorFetchingMsg = 'Error fetching data:';

async function getCurrentLoggedUser(accessToken) {
  try {
    const response = await axiosInstance.get(accountsURLs.appuser.currentUser, {
      headers: {
        Authorization: `${tokenKeyword} ${accessToken}`,
      },
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function getUserById(id) {
  try {
    const response = await axiosInstance.get(accountsURLs.appuser.getSingleUser(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function loginUser(userData) {
  try {
    const response = await axiosInstance.post(accountsURLs.token.access, userData);
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function testToken(token) {
  try {
    await axiosInstance.post(accountsURLs.token.verify, { token });
    return true;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return false;
  }
}

async function refreshAPIToken(token) {
  try {
    const response = await axiosInstance.post(accountsURLs.token.refresh, {
      refresh: token,
    });

    const userStore = useUsersStore();
    userStore.setAccessToken(response.data.access);
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    throw error;
  }
}

export { getUserById, loginUser, testToken, getCurrentLoggedUser, refreshAPIToken };
