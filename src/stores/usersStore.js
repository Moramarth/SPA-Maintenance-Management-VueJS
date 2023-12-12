import { defineStore } from 'pinia';
import { getProfiles } from '../dataProviders/profile';
import { getUserById } from '../dataProviders/auth';

export const useUsersStore = defineStore('users', {
  state: () => ({
    profiles: [],
    currentUser: null,
    token: null,
    currentUserProfile: null,
    isAuthenticated: false,
  }),
  getters: {
    getCurrentUser: state => state.currentUser,
    getCurrentToken: state => state.token,
    getStoreProfiles: state => state.profiles,
    authenticationStatus: state => state.isAuthenticated,
  },
  actions: {
    async loadProfiles() {
      this.profiles = await getProfiles();
    },
    async storeLoginUser(id, jwt) {
      this.token = jwt;
      this.currentUser = JSON.stringify(await getUserById(id));
      localStorage.setItem('user', this.currentUser);
      localStorage.setItem('token', this.token);
      this.isAuthenticated = true;
      this.getPersistedUser();
    },
    getPersistedUser() {
      const persisted = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (!persisted || !token)
        return;
      this.currentUser = JSON.parse(persisted);
      this.token = token;
      this.isAuthenticated = true;
    },
    storeLogoutUser() {
      this.currentUser = null;
      localStorage.removeItem('user');
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
