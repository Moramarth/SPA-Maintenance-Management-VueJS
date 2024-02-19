<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
  },
});
const emit = defineEmits(['update:modelValue']);
const placeholder = `Search by ${props.keyword}`;
function handleSearch(event) {
  const searchedValue = event.target.value;
  emit('update:modelValue', searchedValue);
}
</script>

<template>
  <input
    :value="props.modelValue"
    type="text"
    :placeholder="props.keyword ? placeholder : 'Search'"
    @change="handleSearch"
  >
</template>

<style  scoped>
</style>
