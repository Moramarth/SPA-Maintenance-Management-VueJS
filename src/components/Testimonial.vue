<script setup>
import { formatDate } from '../helpers/formatDate';

const props = defineProps({
  testimonial: {
    type: Object,
    required: true,
  },

});
</script>

<template>
  <div class="block-testimonial">
    <div class="block__image">
      <img
        v-if="props.testimonial.user_profile_picture"
        :src="props.testimonial.user_profile_picture"
        class="img-fluid rounded-start"
        alt=""
      >
      <img
        v-else
        src="../../public/default_profile_picture.png"
        class="img-fluid rounded-start"
        alt=""
      >

      <div class="block__image-review">
        <i v-for="index in 5" :key="index" :class="props.testimonial.rating >= index ? 'fa-solid fa-star' : 'fa-regular fa-star'" />
      </div>
    </div>

    <div class="block__content">
      <p v-if="props.testimonial.user">
        <strong>From:</strong> {{ props.testimonial.user_full_name }}
      </p>

      <p v-else>
        <strong>From:</strong> Ex tenant
      </p>

      <p v-if="props.testimonial.comment">
        <strong>Comment:</strong> {{ props.testimonial.comment }}
      </p>

      <p>
        <small
          class="text-muted"
        > Submitted at {{ formatDate(props.testimonial.submitted) }}</small>
      </p>
      <router-link :to="{ name: 'review-details', params: { id: props.testimonial.id } }">
        <i
          class="fa-solid fa-arrow-right-to-bracket"
          data-toggle="tooltip"
          title="See Details"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
