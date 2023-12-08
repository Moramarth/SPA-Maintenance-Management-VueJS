<script>
import Testimonial from '../../../components/Testimonial.vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';

export default {
  components: {
    Testimonial,
    LoadSpinner,
  },
  data() {
    return {
      reviews: [],
      isLoading: false,
    };
  },
};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <template v-else>
    <div class="section__body-group-head">
      <h4>Feedback</h4>

      <router-link class="btn btn-dark" :to="{ name: 'show-all-reviews' }">
        See all reviews
      </router-link>
    </div>
    <h2 v-if="reviews.length === 0">
      No reviews available
    </h2>
    <div
      v-else
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="review in reviews"
          :key="review.id"
          :class="review === reviews[0] ? 'carousel-item active' : 'carousel-item'"
        >
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
  </template>
</template>

<style lang="scss" scoped>

</style>
