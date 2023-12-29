<script>
import { mapState } from 'pinia';
import { formatDate } from '../helpers/formatDate';
import { useUsersStore } from '../stores/usersStore';

export default {
  props: {
    testimonial: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      formatDate,
      profile: {},
    };
  },
  computed: {
    ...mapState(useUsersStore, ['getStoreProfiles']),

  },
  created() {
    if (this.testimonial.user)
      this.profile = this.getStoreProfiles.filter(profile => profile.user === this.testimonial.user)[0];
  },
};
</script>

<template>
  <div class="block-testimonial">
    <div class="block__image">
      <img
        v-if="profile?.file"
        :src="profile.file"
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
        <i v-for="index in 5" :key="index" :class="testimonial.rating >= index ? 'fa-solid fa-star' : 'fa-regular fa-star'" />
      </div>
    </div>

    <div class="block__content">
      <p v-if="testimonial.user">
        <strong>From:</strong> {{ profile?.first_name }}  {{ profile?.last_name }}
      </p>

      <p v-else>
        <strong>From:</strong> Ex tenant
      </p>

      <p v-if="testimonial.comment">
        <strong>Comment:</strong> {{ testimonial.comment }}
      </p>

      <p>
        <small
          class="text-muted"
        > Submitted at {{ formatDate(testimonial.submitted) }}</small>
      </p>
      <router-link :to="{ name: 'review-details', params: { id: testimonial.id } }">
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
