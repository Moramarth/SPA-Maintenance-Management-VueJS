import { defineStore } from 'pinia';
import { getProfiles, getUserById } from '../dataProviders/profile';

export const useUsersStore = defineStore('users', {
  state: () => ({
    profiles: [],
    currentUser: null,
    isAuthenticated: false,
  }),
  getters: {
    getCurrentUser: state => state.currentUser,
    getProfiles: state => state.profiles,
    authenticationStatus: state => state.isAuthenticated,
  },
  actions: {
    async loadProfiles() {
      this.profiles = await getProfiles();
    },
    async storeLoginUser(id) {
      this.currentUser = JSON.stringify(await getUserById(id));
      localStorage.setItem('user', this.currentUser);
      this.isAuthenticated = true;
    },
    getPersistedUser() {
      const persisted = localStorage.getItem('user');
      if (!persisted)
        return;
      this.currentUser = JSON.parse(persisted);
      this.isAuthenticated = true;
    },
    storeLogoutUser() {
      this.currentUser = null;
      localStorage.removeItem('user');
      this.isAuthenticated = false;
    },
  },
});
