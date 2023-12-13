<script>
import { mapActions, mapState } from 'pinia';
import { getProfileById } from '../../../dataProviders/profile';
import { logoutUser } from '../../../dataProviders/auth';
import { useUsersStore } from '../../../stores/usersStore';
import { getCompanyById } from '../../../dataProviders/companies';
import LoadSpinner from '../../LoadSpinner.vue';

export default {
  components: {
    LoadSpinner,
  },
  data() {
    return {
      isLoading: true,
      profile: {},
      company: {},
    };
  },
  computed: {
    ...mapState(useUsersStore, ['getCurrentUser']),
  },
  async created() {
    this.profile = await getProfileById(this.getCurrentUser.id);
    this.company = await getCompanyById(this.profile.company);
    this.isLoading = false;
  },
  methods: {
    ...mapActions(useUsersStore, ['storeLogoutUser']),
    handleLogout() {
      logoutUser();
      this.storeLogoutUser();
      this.$router.push({ name: 'home-page' });
    },
  },
};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <template v-else>
    <a
      id="navbarDropdown"
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ profile.first_name }} {{ profile.last_name }}
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li>
        <router-link class="nav-link" :to="{ name: 'profile-details', params: { id: profile.user } }">
          Profile
        </router-link>
      </li>
      <li>
        <router-link
          v-if="company"
          class="nav-link"
          :to="{ name: 'company-details', params: { id: company.id } }"
        >
          Company
        </router-link>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li>
        <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
      </li>
    </ul>
  </template>
</template>

<style scoped>

</style>
