<script setup>
const emit = defineEmits(['changeRow']);

function handleRowsPerPageChange(event) {
  emit('changeRow', event.target.value);
}
</script>

<template>
  <label for="rowsPerPage">Items Per Page:</label>
  <select id="item-per-page-choice" @change="handleRowsPerPageChange">
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
