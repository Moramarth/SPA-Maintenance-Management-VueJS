import { testToken } from '../dataProviders/auth';
import { useUsersStore } from '../stores/usersStore';

async function validateUser() {
  const userStore = useUsersStore();
  const token = userStore.getCurrentToken;

  const isLoggedIn = await testToken(token);

  if (!isLoggedIn) {
    userStore.storeLogoutUser();
    return { name: 'login-page' };
  }
  return true;
};

export { validateUser };
