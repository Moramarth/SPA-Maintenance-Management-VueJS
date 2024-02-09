import { refreshAPIToken, testToken } from '../dataProviders/auth';
import { useUsersStore } from '../stores/usersStore';
import { tokenKeyword } from '../constants/tokenKeyword';

async function validateUser() {
  const userStore = useUsersStore();
  const [accessToken, refreshToken] = userStore.getCurrentTokens;

  const isLoggedIn = await testToken(accessToken);

  if (!isLoggedIn) {
    try {
      await refreshAPIToken(refreshToken);
    }
    catch (error) {
      userStore.storeLogoutUser();
      return { name: 'login-page' };
    }
  }
  return true;
};

function authHeaders() {
  const userStore = useUsersStore();
  return { Authorization: `${tokenKeyword} ${userStore.getCurrentTokens[0]}` };
}

export { validateUser, authHeaders };
