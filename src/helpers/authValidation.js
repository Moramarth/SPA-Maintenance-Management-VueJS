import { useUsersStore } from '../stores/usersStore';

function validateUser() {
  const userStore = useUsersStore();
  return userStore.isAuthenticated ? userStore.isAuthenticated : { name: 'login-page' };
};

export { validateUser };
