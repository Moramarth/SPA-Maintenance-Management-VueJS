<script setup>
const props = defineProps({
  isEditing: {
    type: Boolean,
    required: true,
  },
  fallbackURL: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['isEdited', 'isCreated']);
</script>

<template>
  <div class="form__foot">
    <button v-if="props.isEditing" class="btn btn-success" @click.prevent="emit('isEdited')">
      Save
    </button>
    <button v-else class="btn btn-primary" @click.prevent="emit('isCreated')">
      Create
    </button>
    <router-link :to="props.fallbackURL">
      Cancel
    </router-link>
  </div>
</template>

<style scoped>

</style>
