<script setup>
import { reportType } from '../../constants/reportType';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);
function handleChange(event) {
  const selectedValue = event.target.value;
  emit('update:modelValue', selectedValue);
}
</script>

<template>
  <select :value="props.modelValue" @change="handleChange">
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

<style scoped>
</style>
