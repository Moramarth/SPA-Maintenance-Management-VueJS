<script>
export default {
  props: {
    fallbackURL: {
      type: Object,
      required: true,
    },
  },
  emits: ['confirmDelete'],
};
</script>

<template>
  <div class="form__foot">
    <button class="btn btn-danger" @click.prevent="$emit('confirmDelete')">
      Confirm
    </button>
    <router-link :to="fallbackURL">
      Cancel
    </router-link>
  </div>
</template>

<style scoped>

</style>
