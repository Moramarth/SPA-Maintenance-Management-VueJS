<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: 'Service report title',
          submitDate: 'Date of subbmission',
        };
      },
    },
  },
};
</script>

<template>
  <h2>Are you sure you want to delete your service report?</h2>
  <p>{{ object.title }} from {{ object.submitDate }}</p>
</template>

<style lang="scss" scoped>

</style>
