import { defineStore } from 'pinia';
import { getProfiles } from '../dataProviders/profile';
import { getCurrentLoggedUser } from '../dataProviders/auth';

export const useUsersStore = defineStore('users', {
  state: () => ({
    profiles: [],
    currentUser: null,
    accessToken: null,
    refreshToken: null,
    currentUserProfile: null,
    isAuthenticated: false,
  }),
  getters: {
    getCurrentUser: state => state.currentUser,
    getCurrentTokens: state => [state.accessToken, state.refreshToken],
    getStoreProfiles: state => state.profiles,
    authenticationStatus: state => state.isAuthenticated,
  },
  actions: {
    async loadProfiles() {
      this.profiles = await getProfiles();
    },
    setAccessToken(token) {
      this.accessToken = token;
    },
    async storeLoginUser(refresh, access) {
      this.accessToken = access;
      this.refreshToken = refresh;
      localStorage.setItem('user', JSON.stringify(await getCurrentLoggedUser(access)));
      localStorage.setItem('accessToken', this.accessToken);
      localStorage.setItem('refreshToken', this.refreshToken);
      this.getPersistedUser();
    },
    getPersistedUser() {
      const persisted = localStorage.getItem('user');
      const access = localStorage.getItem('accessToken');
      const refresh = localStorage.getItem('refreshToken');
      if (!persisted || !access || !refresh)
        return;
      this.currentUser = JSON.parse(persisted);
      this.accessToken = access;
      this.refreshToken = refresh;
      this.isAuthenticated = true;
    },
    storeLogoutUser() {
      this.currentUser = null;
      localStorage.removeItem('user');
      this.isAuthenticated = false;
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});
