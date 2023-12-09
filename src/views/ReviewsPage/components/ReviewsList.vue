<script>
import Testimonial from '../../../components/Testimonial.vue';

export default {
  components: {
    Testimonial,
  },

  data() {
    return {
      array: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Reviews</h1>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          filters
        </div>
        <div class="section__body-group">
          <h1 v-if="array.length === 0">
            No Reviews to show
          </h1>
          <template v-for="review in array" :key="review.id">
            <Testimonial
              :testimonial="review"
            />
          </template>
        </div>
        pagination
      </div>
    </div>
  </section>
</template>

<style  scoped>

</style>
