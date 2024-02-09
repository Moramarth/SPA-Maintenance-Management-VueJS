<script setup>
const props = defineProps({
  errors: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div v-for="error of props.errors" :key="error.$uid" class="input-errors">
    <div class="error-msg">
      {{ error.$message }}
    </div>
  </div>
</template>

<style scoped>
.error-msg {
  color: red
}
</style>
