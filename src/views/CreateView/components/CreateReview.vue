<script>
export default {
  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          comment: 'Some comment here',
          rating: 2,
        };
      },
    },
    rating: {
      type: Array,
      required: false,
      default: () => {
        return [
          // Integer for DB, string for human readability choice
          [1, 'Very Bad'],
          [2, 'Bad'],
          [3, 'Good'],
          [4, 'Very good'],
          [5, 'Excellent'],
        ];
      },
    },
  },
};
</script>

<template>
  <template v-if="isEditing">
    <p v-if="object.serviceReport">
      Your Review for {{ object.serviceReport }}
    </p>
    <label for="review-rating">Rating:</label>
    <select
      id="review-rating"
      type="text"
      required
    >
      <option
        v-for="rate in rating"
        :key="rate"
        value="rate[0]"
        :selected="object.rating === rate[0]"
      >
        {{ rate[1] }}
      </option>
    </select>
    <label for="review-comment">Comment:</label>
    <textarea
      id="review-comment"
      type="text"
      required
      :value="object.comment"
    />
  </template>
  <template v-else>
    <p v-if="object.serviceReport">
      Your Review for {{ object.serviceReport }}
    </p>
    <label for="review-rating">Rating:</label>
    <select
      id="review-rating"
      type="text"
      required
    >
      <option v-for="rate in rating" :key="rate" value="rate[0]">
        {{ rate[1] }}
      </option>
    </select>
    <label for="review-comment">Comment:</label>
    <textarea id="review-comment" type="text" required />
  </template>
</template>

<style lang="scss" scoped>

</style>
