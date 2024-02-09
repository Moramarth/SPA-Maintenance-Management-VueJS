<script setup>
const emit = defineEmits(['selected']);

const reportStatuses = [
  'Pending',
  'Assigned',
  'Done',
  'Rejected',
];

function handleChange(event) {
  const selectedValue = event.target.value;
  emit('selected', selectedValue);
}
</script>

<template>
  <select id="report-status-selector" @change="handleChange">
    <option value="" selected>
      Filter by Report Status
    </option>
    <option
      v-for="status in reportStatuses"
      :key="status"
      :value="status"
    >
      {{ status }}
    </option>
  </select>
</template>

<style lang="scss" scoped>

</style>
