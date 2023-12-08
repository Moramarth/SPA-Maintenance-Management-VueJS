<script>
export default {
  props: {
    testimonial: {
      type: Object,
      required: false,
      default: () => {
        return {
          user: 'User',

          comment: 'this is a comment',
          submitted: 'Date time',
        };
      },
    },
  },
};
</script>

<template>
  <div class="block-testimonial">
    <div class="block__image">
      <img
        v-if="testimonial.userImage"
        :src="testimonial.userImage"
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
        <!-- {% for i in range %}
        {% if i > review.rating %} -->
        <i class="fa-regular fa-star" />
        <!-- {% else %} -->
        <i class="fa-solid fa-star" />
        <!-- {% endif %}
        {% endfor %} -->
      </div>
    </div>

    <div class="block__content">
      <p v-if="testimonial.user">
        <strong>From:</strong> {{ testimonial.user }}
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
        > Submitted at {{ testimonial.submitted }}</small>
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
