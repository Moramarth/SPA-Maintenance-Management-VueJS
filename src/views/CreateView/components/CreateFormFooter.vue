<script>
export default {
  props: {
    isEditing: {
      type: Boolean,
      required: true,
    },
    fallbackURL: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="form__foot">
    <button v-if="isEditing" class="btn btn-success">
      Save
    </button>
    <button v-else class="btn btn-primary">
      Create
    </button>
    <a :href="fallbackURL">Cancel</a>
  </div>
</template>

<style scoped>

</style>
