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
  emits: ['isEdited', 'isCreated'],
};
</script>

<template>
  <div class="form__foot">
    <button v-if="isEditing" class="btn btn-success" @click.prevent="$emit('isEdited')">
      Save
    </button>
    <button v-else class="btn btn-primary" @click.prevent="$emit('isCreated')">
      Create
    </button>
    <router-link :to="fallbackURL">
      Cancel
    </router-link>
  </div>
</template>

<style scoped>

</style>
