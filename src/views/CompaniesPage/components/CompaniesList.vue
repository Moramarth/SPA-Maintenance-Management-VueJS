<script>
import CompanyCard from '../../../components/CompanyCard.vue';

export default {
  components: {
    CompanyCard,
  },
  data() {
    return {
      array: [],
    };
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Our partners</h1>
      </div>
      <div class="section__body">
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
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
