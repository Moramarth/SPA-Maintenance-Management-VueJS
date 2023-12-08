<script>
import CompanyCard from '../../../components/CompanyCard.vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';

export default {
  components: {
    CompanyCard,
    LoadSpinner,
  },
  data() {
    return {
      companies: [],
      isLoading: false,
    };
  },
};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <template v-else>
    <div class="section__body-group-head">
      <h4>Our partners</h4>

      <router-link class="btn btn-dark" :to="{ name: 'show-all-companies' }">
        See all partners
      </router-link>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <template v-if="companies.length === 0">
        <h2>No Partners yet</h2>
      </template>
      <template v-else>
        <CompanyCard v-for="company in companies" :key="company.id" :company="company" />
      </template>
    </div>
  </template>
</template>

<style lang="scss" scoped>

</style>
