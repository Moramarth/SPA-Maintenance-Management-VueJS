<script setup>
const props = defineProps({
  fallbackURL: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['confirmDelete']);
</script>

<template>
  <div class="form__foot">
    <button class="btn btn-danger" @click.prevent="emit('confirmDelete')">
      Confirm
    </button>
    <router-link :to="props.fallbackURL">
      Cancel
    </router-link>
  </div>
</template>

<style scoped>

</style>
