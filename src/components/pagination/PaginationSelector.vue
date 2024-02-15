<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

function handleRowsPerPageChange(event) {
  emit('update:modelValue', Number(event.target.value));
}
</script>

<template>
  <label for="rowsPerPage">Items Per Page:</label>
  <select :value="props.modelValue" @change="handleRowsPerPageChange">
    <option value="5">
      5
    </option>
    <option value="10">
      10
    </option>
    <option value="15">
      15
    </option>
    <option value="20">
      20
    </option>
  </select>
</template>

<style  scoped>
label {
  text-align: center;
}
</style>
