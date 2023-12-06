<script>
import BuildingCard from '../../components/BuildingCard.vue';
import CompanyCard from '../../components/CompanyCard.vue';
import Testimonial from '../../components/Testimonial.vue';

export default {
  components: {
    BuildingCard,
    CompanyCard,
    Testimonial,
  },
  data() {
    return {
      buildings: [1],
      companies: [1],
      reviews: [],
    };
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
          <div class="section__body-group-head">
            <h4>Our Buildings</h4>

            <a class="btn btn-dark" href="#"> See all buildings</a>
          </div>

          <div class="row row-cols-1 row-cols-md-3 g-4">
            <template v-if="buildings.length === 0">
              <h1>No Buildings to show</h1>
            </template>
            <template v-else>
              <BuildingCard />
              <BuildingCard />
              <BuildingCard />
            </template>
          </div>
        </div>

        <div class="section__body-group">
          <div class="section__body-group-head">
            <h4>Our partners</h4>

            <a class="btn btn-dark" href="#"> See all partners</a>
          </div>

          <div class="row row-cols-1 row-cols-md-3 g-4">
            <template v-if="companies.length === 0">
              <h1>No Partners yet</h1>
            </template>
            <template v-else>
              <CompanyCard />
              <CompanyCard />
              <CompanyCard />
            </template>
          </div>
        </div>

        <div class="section__body-group">
          <div class="section__body-group-head">
            <h4>Feedback</h4>

            <a class="btn btn-dark" href="#"> See all reviews</a>
          </div>

          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <!-- TODO: Dynamic change active status -->
              <div class="carousel-item active">
                <Testimonial />
              </div>
              <div class="carousel-item ">
                <Testimonial />
              </div>

              <div class="carousel-item">
                <Testimonial />
              </div>

              <div class="carousel-item">
                <Testimonial />
              </div>
            </div>

            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true" />
              <span class="visually-hidden">Previous</span>
            </button>

            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true" />
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
