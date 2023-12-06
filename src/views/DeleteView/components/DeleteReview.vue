<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          serviceReport: 'Service report title',
          rating: 3,
          comment: 'Some comment here',
        };
      },
    },
  },
};
</script>

<template>
  <h2>Are you sure you want to delete your Review?</h2>
  <p>Report: {{ object.serviceReport }}</p>
  <p>Rated: {{ object.rating }}</p>
  <p>Your comment: {{ object.comment }}</p>
</template>

<style lang="scss" scoped>

</style>
