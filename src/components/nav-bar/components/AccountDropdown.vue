<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../../../stores/usersStore';
import LoadSpinner from '../../LoadSpinner.vue';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import {commonRouteNames, detailsRouteNames} from "../../../router/routeNames.js";

const userStore = useUsersStore();
const router = useRouter();
const isLoading = ref(true);
let profile = reactive({});
let company = reactive({});

onMounted(async () => {
  profile = await dataObjectMapping.profile(userStore.getCurrentUser.id);
  company = await dataObjectMapping.company(userStore.getCurrentProfile.company);
  isLoading.value = false;
});

function handleLogout() {
  userStore.storeLogoutUser();
  router.push({ name: commonRouteNames.login });
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
        <router-link class="nav-link" :to="{ name: detailsRouteNames.profile, params: { id: profile.user } }">
          Profile
        </router-link>
      </li>
      <li>
        <router-link
          v-if="company"
          class="nav-link"
          :to="{ name: detailsRouteNames.company, params: { id: company.id } }"
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
