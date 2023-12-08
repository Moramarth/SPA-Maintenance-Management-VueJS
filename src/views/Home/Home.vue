<script>
import SectionBuildings from './components/SectionBuildings.vue';
import SectionPartners from './components/SectionPartners.vue';
import SectionReviews from './components/SectionReviews.vue';

export default {
  components: {
    SectionBuildings,
    SectionPartners,
    SectionReviews,
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
          <SectionBuildings />
        </div>

        <div class="section__body-group">
          <SectionPartners />
        </div>

        <div class="section__body-group">
          <SectionReviews />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
