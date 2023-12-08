<script>
import CompanyCard from '../../../components/CompanyCard.vue';

export default {
  components: {
    CompanyCard,
  },
  props: {
    array: {
      type: Array,
      required: false,
      default: () => {
        return [{
          name: 'Company Name',
          file: 'default_company_logo.jpg',
          businessField: 'Compnay Business Field',
        }, {
          name: 'Company Name',
          file: 'default_company_logo.jpg',
          businessField: 'Compnay Business Field',
        }, { name: 'Company Name', file: 'default_company_logo.jpg', businessField: 'Compnay Business Field' }];
      },

    },
  },
};
</script>

<template>
  <div class="section__body-group">
    filters
  </div>
  <div class="section__body-group">
    <h1 v-if="array.length === 0">
      No Partners to show
    </h1>
    <div v-else class="row row-cols-1 row-cols-md-3 g-4">
      <template v-for="company in array" :key="company.id">
        <CompanyCard company:company />
      </template>
    </div>
  </div>
  pagination
</template>

<style lang="scss" scoped>

</style>
