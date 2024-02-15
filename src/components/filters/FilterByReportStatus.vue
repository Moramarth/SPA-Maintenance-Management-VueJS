<script setup>
import { reportStatuses } from '../../constants/reportStatuses';

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

<style scoped>
</style>
