<script>
export default {
  props: {
    fallbackURL: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="form__foot">
    <button class="btn btn-danger">
      Confirm
    </button>
    <a :href="fallbackURL">Cancel</a>
  </div>
</template>

<style scoped>

</style>
