<script setup>
const emit = defineEmits(['isSearching']);

function handleSearch(event) {
  const searchedValue = event.target.value;
  emit('isSearching', searchedValue);
}
</script>

<template>
  <input
    id="search-box"
    type="text"
    placeholder="Search in titles"
    @change="handleSearch"
  >
</template>

<style lang="scss" scoped>

</style>
