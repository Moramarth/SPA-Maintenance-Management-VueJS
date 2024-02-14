<script setup>
import { filterElementId } from '../../helpers/filterReset';

const emit = defineEmits(['isSearching']);

function handleSearch(event) {
  const searchedValue = event.target.value;
  emit('isSearching', searchedValue);
}
</script>

<template>
  <input
    :id="filterElementId.search"
    type="text"
    placeholder="Search in titles"
    @change="handleSearch"
  >
</template>

<style lang="scss" scoped>

</style>
