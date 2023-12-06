<script>
import Testimonial from '../../../components/Testimonial.vue';

export default {
  components: {
    Testimonial,
  },
  props: {
    reviews: {
      type: Array,
      required: false,
      default: () => {
        return [{
          id: -1,
          user: 'Build',
          userImage: 'Assigned city info',
          comment: 'this is a comment from listview',
          submited: 'ytoda',

        }, {}, { }];
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
    <h1 v-if="reviews.length === 0">
      No Reviews to show
    </h1>
    <template v-for="review in reviews" :key="review.id">
      <Testimonial
        :testimonial="review"
      />
    </template>
  </div>
  pagination
</template>

<style lang="scss" scoped>

</style>
