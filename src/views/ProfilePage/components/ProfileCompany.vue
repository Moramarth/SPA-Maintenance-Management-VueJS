<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { useUsersStore } from '../../../stores/usersStore';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import { detailsRouteNames, editRouteNames } from '../../../router/routeNames.js';

const props = defineProps({
  profileObject: {
    type: Object,
    required: true,
  },
});

const userStore = useUsersStore();

const company = ref({});
const isLoading = ref(true);

const profileCompany = computed(() => {
  return userStore.getCurrentProfile.company;
});
const userCanEdit = computed(() => userStore.authenticationStatus && profileCompany.value === company.value.id);

onMounted (async () => {
  watch(() => props.profileObject, async (newProfileObject) => {
    company.value = await dataObjectMapping.company(newProfileObject.company);
    isLoading.value = false;
  });
});
</script>

<template>
  <LoadSpinner v-if="isLoading" />

  <div v-else class="block-testimonial">
    <div class="block__image">
      <img v-if="company.file" :src="company.file" alt="Company Logo">

      <img v-else src="../../../../public/default_company_logo.jpg" alt="">
    </div>
    <div class="block__content">
      <h1>
        {{ company.name }}
        <router-link :to="{ name: detailsRouteNames.company, params: { id: company.id } }">
          <i
            class="fa-solid fa-arrow-right-to-bracket"
            data-toggle="tooltip"
            title="See Details"
          />
        </router-link>
      </h1>
      <div class="form-main form-main--filters">
        <div v-if="company.business_field" class="form__label">
          <label>Business Field:</label>
          {{ company.business_field }}
        </div>
        <div v-if="userCanEdit" class="form__label">
          <router-link
            class="btn btn-danger"
            :to="{ name: editRouteNames.company, params: { id: company.id } }"
          >
            Edit
            Company
            Info
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
