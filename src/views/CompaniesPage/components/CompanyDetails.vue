<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useUsersStore } from '../../../stores/usersStore';
import { formatDate } from '../../../helpers/formatDate';
import { editRouteNames } from '../../../router/routeNames.js';
import DetailsView from '../../../components/defaultViews/DetailsView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering.js';
import CompanyAddress from './CompanyAddress.vue';
import CompanyEmployees from './CompanyEmployees.vue';

const route = useRoute();
const userStore = useUsersStore();
const conditions = structuredClone(conditionalObjectRendering);
conditions.representedAs.tabList = true;

const userCanEdit = computed(() => userStore.authenticationStatus && userStore.getCurrentProfile.company === Number(route.params.id));
</script>

<template>
  <DetailsView
    :object-type="conditions.company"
    :object-represented-as="conditions.representedAs"
  >
    <template #page-header>
      Company Details
    </template>
    <template #main-tab-text>
      Company Info
    </template>
    <template #secondary-tab-text>
      Address
    </template>
    <template #tetriary-tab-text>
      Employees
    </template>
    <template #main-tab-block-image="{ ...object }">
      <img v-if="object.file" :src="object.file" alt="Company Logo">

      <img v-else src="../../../../public/default_company_logo.jpg" alt="Default Company logo">
    </template>
    <template #main-tab-block-content="{ ...object }">
      <h1>{{ object.name }}</h1>
      <div class="form-main form-main--filters">
        <div class="form__label">
          <template v-if="object.business_field">
            <label>Business Field:</label>
            {{ object.business_field }}
          </template>

          <template v-if="object.additional_information">
            <label>About us:</label>
            {{ object.additional_information }}
          </template>
        </div>
        <div class="form__label">
          <p class="text-muted">
            Partner since: {{ formatDate(object.created_on) }}
          </p>

          <router-link v-if="userCanEdit" class="btn btn-danger" :to="{ name: editRouteNames.company, params: { id: object.id } }">
            Edit
            Company Info
          </router-link>
        </div>
      </div>
    </template>
    <template #secondary-tab-component="{ ...object }">
      <CompanyAddress :company-id="Number(object.id)" />
    </template>
    <template #tetriary-tab-component="{ ...object }">
      <CompanyEmployees :company-id="Number(object.id)" />
    </template>
  </DetailsView>
</template>

<style scoped>
</style>
