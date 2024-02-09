<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getProfileById } from '../../../dataProviders/profile';
import { useUsersStore } from '../../../stores/usersStore';
import { getCompanyById } from '../../../dataProviders/companies';
import LoadSpinner from '../../LoadSpinner.vue';

const userStore = useUsersStore();
const router = useRouter();
const isLoading = ref(true);
let profile = reactive({});
let company = reactive({});

onMounted(async () => {
  profile = await getProfileById(userStore.getCurrentUser.id);
  company = await getCompanyById(userStore.getCurrentProfile.company);
  isLoading.value = false;
});

function handleLogout() {
  userStore.storeLogoutUser();
  router.push({ name: 'login-page' });
}
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
