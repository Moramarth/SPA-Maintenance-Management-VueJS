<script>
import { getCompanyEmployees } from '../../../dataProviders/companies';

export default {
  props: {
    companyId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      employees: [],
    };
  },
  async created() {
    this.employees = await getCompanyEmployees(this.companyId);
  },
};
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

<style lang="scss" scoped>

</style>
