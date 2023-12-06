<script>
export default {
  props: {
    testimonial: {
      type: Object,
      required: false,
      default: () => {
        return {
          user: 'User',
          userImage: 'default_profile_picture.png',
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
        src="default_profile_picture.png"
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
    </div>
  </div>
</template>

<style scoped>
.block-testimonial {
    width: auto;
    display: flex;
    align-items: center;
    margin: 1.2rem 9.0rem;
    padding: 2.0rem;
    border-radius: 1rem;
    box-shadow: 0 0 1rem black;
    transition: box-shadow 0.4s;
    background-color: white;
    border: 1px solid #000;
}

.block-testimonial .block__image {
    width: 30.0rem;
    /*max-height: 30rem;*/
    position: relative;
}

.block-testimonial .block__image img {
    display: block;
    width: 100%;
    max-height: 30rem;
    border: 1px solid black;
    border-radius: 1.0rem;
    object-fit: cover;
    object-position: center top;
}

.block-testimonial .block__content {
    width: calc(100% - 30.0rem);
    padding: 2.0rem;
    font-size: 1.8rem;
}

.block-testimonial .block__image-review {
    position: absolute;
    right: -1.0rem;
    bottom: -1.0rem;
    z-index: 10;
    padding: 0.4rem 0.8rem;
    background-color: white;
    border-radius: 0.5rem;
    border: 1px solid black;
}

@media (max-width: 1199.98px) {
    .block-testimonial {
        flex-direction: column;
        gap: 2.0rem;
    }

    .block-testimonial .block__image {
        width: 100%;
        max-width: 30.0rem;
        margin-left: auto;
        margin-right: auto;
        height: 0;
        padding-top: 30.0rem;
    }

    .block-testimonial .block__image img {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
    }

    .block-testimonial .block__content {
        padding: 0;
        width: 100%;
    }
}

@media (max-width: 991.98px) {
    .block-testimonial {
        margin: 0;
    }
}
</style>
