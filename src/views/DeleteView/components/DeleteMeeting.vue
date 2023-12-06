<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          meetingDate: 'Meeting date',

        };
      },
    },
  },
};
</script>

<template>
  <h2>Are you sure you want to delete your scheduled meeting?</h2>
  <p> {{ object.meetingDate }}</p>
</template>

<style lang="scss" scoped>

</style>
