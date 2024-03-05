<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import DetailsView from '../../../components/defaultViews/DetailsView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering.js';
import { editRouteNames } from '../../../router/routeNames.js';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping.js';
import { useUsersStore } from '../../../stores/usersStore.js';
import ProfileCompany from './ProfileCompany.vue';
import ProfileAddress from './profileAddress.vue';

const route = useRoute();
const conditions = structuredClone(conditionalObjectRendering);
conditions.representedAs.tabList = true;
const user = ref({});
const userStore = useUsersStore();

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      user.value = await dataObjectMapping.user(route.params.id);
    },

    { immediate: true },
  );
});
const userCanEdit = computed(() => userStore.getCurrentUser?.id === user.value.id);
const passwordChangeUrl = computed(() => `http://127.0.0.1:8000/accounts/password/change/${userStore.getCurrentUser?.id}/`);
</script>

<template>
  <DetailsView
    :object-type="conditions.typeOfObject.profile"
    :object-represented-as="conditions.representedAs"
  >
    <template #page-header>
      Profile Details
    </template>
    <template #main-tab-text>
      Personal Information
    </template>
    <template #secondary-tab-text>
      Company Details
    </template>
    <template #tetriary-tab-text>
      Current Address
    </template>
    <template #main-tab-block-image="{ ...object }">
      <img v-if="object.file" :src="object.file" alt="Profile Picture">

      <img v-else src="../../../../public/default_profile_picture.png" alt="">
    </template>

    <template #main-tab-block-content="{ ...object }">
      <h1>{{ object.first_name }} {{ object.last_name }}</h1>
      <div class="form-main form-main--filters">
        <div class="form__label">
          <label>Phone number:</label> {{ object.phone_number }}
          <label>Email:</label> {{ user.email }}
        </div>
        <div v-if="userCanEdit" class="form__foot">
          <router-link
            class="btn btn-warning"
            :to="{ name: editRouteNames.profile, params: { id: object.user } }"
          >
            Edit
            Profile
          </router-link>

          <a
            class="btn btn-danger"
            :href="passwordChangeUrl"
          >
            Change Password
          </a>
        </div>
      </div>
    </template>

    <template #secondary-tab-component="{ ...object }">
      <ProfileCompany :profile-object="object" />
    </template>
    <template #tetriary-tab-component="{ ...object }">
      <ProfileAddress :company-id="Number(object.company)" />
    </template>
  </DetailsView>
</template>

<style scoped>
</style>
