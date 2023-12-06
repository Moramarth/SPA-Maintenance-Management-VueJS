<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          serviceReport: 'Service report title',
          user: 'User assigned to',
        };
      },
    },
  },
};
</script>

<template>
  <h2>Are you sure you want to delete this Assignment?</h2>
  <p> {{ object.service_report }} assigned to {{ object.user }}</p>
</template>

<style scoped>

</style>
