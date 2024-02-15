<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

function handleSearch(event) {
  const searchedValue = event.target.value;
  emit('update:modelValue', searchedValue);
}
</script>

<template>
  <input
    :value="props.modelValue"
    type="text"
    placeholder="Search in titles"
    @change="handleSearch"
  >
</template>

<style  scoped>
</style>
