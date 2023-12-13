<script>
import { getHomePage } from '../../dataProviders/homePage';
import SectionBuildings from './components/SectionBuildings.vue';
import SectionPartners from './components/SectionPartners.vue';
import SectionReviews from './components/SectionReviews.vue';

export default {
  components: {
    SectionBuildings,
    SectionPartners,
    SectionReviews,
  },
  data() {
    return {
      buildings: [],
      companies: [],
      reviews: [],
      isLoading: true,
    };
  },
  async created() {
    const randomData = await getHomePage();
    this.buildings = randomData.buildings;
    this.companies = randomData.tenants;
    this.reviews = randomData.reviews;
    this.isLoading = false;
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>We take care of our buildings</h1>

        <h2>You focus on your business</h2>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          <SectionBuildings :is-loading="isLoading" :buildings="buildings" />
        </div>

        <div class="section__body-group">
          <SectionPartners :is-loading="isLoading" :companies="companies" />
        </div>

        <div class="section__body-group">
          <SectionReviews :is-loading="isLoading" :reviews="reviews" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
