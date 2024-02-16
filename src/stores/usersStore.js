import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getProfileById } from '../dataProviders/profile';
import { getCurrentLoggedUser } from '../dataProviders/auth';

export const useUsersStore = defineStore('users', () => {
  const currentUser = ref(null);
  const currentProfile = ref(null);
  const accessToken = ref(null);
  const refreshToken = ref(null);
  const isAuthenticated = ref(false);

  const getCurrentUser = computed(() => currentUser.value);
  const getCurrentTokens = computed(() => [accessToken.value, refreshToken.value]);
  const getCurrentProfile = computed(() => currentProfile.value);
  const authenticationStatus = computed(() => isAuthenticated.value);

  function setAccessToken(token) {
    localStorage.removeItem('accessToken');
    accessToken.value = token;
    localStorage.setItem('accessToken', accessToken.value);
  }

  async function storeLoginUser(refresh, access) {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem('user', JSON.stringify(await getCurrentLoggedUser(access)));
    localStorage.setItem('accessToken', accessToken.value);
    localStorage.setItem('refreshToken', refreshToken.value);
    await getPersistedUser();
  }

  async function getPersistedUser() {
    const persisted = localStorage.getItem('user');
    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    if (!persisted || !access || !refresh)
      return;
    currentUser.value = JSON.parse(persisted);
    accessToken.value = access;
    refreshToken.value = refresh;
    currentProfile.value = await getProfileById(currentUser.value.id);
    isAuthenticated.value = true;
  }

  function storeLogoutUser() {
    currentUser.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  return {
    getCurrentUser,
    getCurrentTokens,
    getCurrentProfile,
    authenticationStatus,
    setAccessToken,
    storeLoginUser,
    getPersistedUser,
    storeLogoutUser,
  };
});
