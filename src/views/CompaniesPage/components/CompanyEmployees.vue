<script setup>
import { onMounted, ref } from 'vue';
import { getCompanyEmployees } from '../../../dataProviders/companies';

const props = defineProps({
  companyId: {
    type: Number,
    required: true,
  },
});

const employees = ref([]);

onMounted (async () => {
  employees.value = await getCompanyEmployees(props.companyId);
});
</script>

<template>
  <div class="container">
    <div class="form-main form-main--login">
      <h2 v-if="employees.length === 0">
        No Employees to show
      </h2>
      <template v-else>
        <div v-for="profile in employees.value" :key="profile.user">
          {{ profile.first_name }} {{ profile.last_name }}
          <router-link :to="{ name: 'profile-details', params: { id: profile.user } }">
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
