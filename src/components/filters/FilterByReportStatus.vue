<script setup>
import { reportStatuses } from '../../constants/reportStatuses';
import { filterElementId } from '../../helpers/filterReset';

const emit = defineEmits(['selected']);

function handleChange(event) {
  const selectedValue = event.target.value;
  emit('selected', selectedValue);
}
</script>

<template>
  <select :id="filterElementId.reportStatus" @change="handleChange">
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
