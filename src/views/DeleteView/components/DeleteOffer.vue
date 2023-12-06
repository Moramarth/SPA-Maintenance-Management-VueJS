<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: 'Offer title',
        };
      },
    },
  },
};
</script>

<template>
  <h2>Are you sure you want to delete your offer?</h2>
  <p>{{ object.title }}</p>
</template>

<style lang="scss" scoped>

</style>
