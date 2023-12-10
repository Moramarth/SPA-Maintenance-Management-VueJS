import { defineStore } from 'pinia';
import { getProfiles, getUserById } from '../dataProviders/profile';

export const useUsersStore = defineStore('users', {
  state: () => ({
    profiles: [],
    currentUser: null,
  }),
  getters: {
    getCurrentUser: state => state.currentUser,
    getProfiles: state => state.profiles,
  },
  actions: {
    async loadProfiles() {
      this.profiles = await getProfiles();
    },
    async loginUser() {
      // set user after auth verification
      this.currentUser = await getUserById(1);
    },
    logoutuser() {
      this.currentUser = null;
    },
  },
});
