<script setup>
import { onMounted, ref, watch } from 'vue';
import { dataArrayMapping } from '../../../dataProviders/dataLoadMapping';
import { detailsRouteNames } from '../../../router/routeNames.js';

const props = defineProps({
  companyId: {
    type: Number,
    required: true,
  },
});

const employees = ref([]);

onMounted (async () => {
  watch(() => props.companyId, async (newCompanyId) => {
    employees.value = await dataArrayMapping.companyEmployees(newCompanyId);
  });
});
</script>

<template>
  <div class="container">
    <div class="form-main form-main--login">
      <h2 v-if="employees.length === 0">
        No Employees to show
      </h2>
      <template v-else>
        <div v-for="profile in employees" :key="profile.user">
          {{ profile.first_name }} {{ profile.last_name }}
          <router-link :to="{ name: detailsRouteNames.profile, params: { id: profile.user } }">
            <i
              class="fa-solid fa-circle-info"
              data-toggle="tooltip"
              title="Contact Info"
            />
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
</style>
