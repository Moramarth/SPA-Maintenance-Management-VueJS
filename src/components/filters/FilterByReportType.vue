<script setup>
import { reportType } from '../../constants/reportType';
import { filterElementId } from '../../helpers/filterReset';

const emit = defineEmits(['selected']);
function handleChange(event) {
  const selectedValue = event.target.value;
  emit('selected', selectedValue);
}
</script>

<template>
  <select :id="filterElementId.reportType" @change="handleChange">
    <option value="" selected>
      Filter by Report Type
    </option>
    <option
      v-for="rType in reportType"
      :key="rType"
      :value="rType"
    >
      {{ rType }}
    </option>
  </select>
</template>

<style lang="scss" scoped>

</style>
