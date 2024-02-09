<script setup>
const emit = defineEmits(['selected']);

const reportType = [
  'Other',
  'Networking',
  'Electrical',
  'Plumbing',
  'Structural Integrity',
  'Security Systems',
  'Landscaping',
];

function handleChange(event) {
  const selectedValue = event.target.value;
  emit('selected', selectedValue);
}
</script>

<template>
  <select id="report-type-selector" @change="handleChange">
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
