import { defineStore } from 'pinia';
import { getProfileById } from '../dataProviders/profile';
import { getCurrentLoggedUser } from '../dataProviders/auth';

export const useUsersStore = defineStore('users', {
  state: () => ({
    currentUser: null,
    currentProfile: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }),
  getters: {
    getCurrentUser: state => state.currentUser,
    getCurrentTokens: state => [state.accessToken, state.refreshToken],
    getCurrentProfile: state => state.currentProfile,
    authenticationStatus: state => state.isAuthenticated,
  },
  actions: {
    setAccessToken(token) {
      localStorage.removeItem('accessToken');
      this.accessToken = token;
      localStorage.setItem('accessToken', this.accessToken);
    },
    async storeLoginUser(refresh, access) {
      this.accessToken = access;
      this.refreshToken = refresh;
      localStorage.setItem('user', JSON.stringify(await getCurrentLoggedUser(access)));
      localStorage.setItem('accessToken', this.accessToken);
      localStorage.setItem('refreshToken', this.refreshToken);
      this.getPersistedUser();
    },
    async getPersistedUser() {
      const persisted = localStorage.getItem('user');
      const access = localStorage.getItem('accessToken');
      const refresh = localStorage.getItem('refreshToken');
      if (!persisted || !access || !refresh)
        return;
      this.currentUser = JSON.parse(persisted);
      this.accessToken = access;
      this.refreshToken = refresh;
      this.currentProfile = await getProfileById(this.currentUser.id);
      this.isAuthenticated = true;
    },
    storeLogoutUser() {
      this.currentUser = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});
