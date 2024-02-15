<script setup>
import { rating } from '../../constants/reviewRating';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

function handleChange(event) {
  const selectedValue = event.target.value;
  emit('update:modelValue', Number(selectedValue));
}
</script>

<template>
  <select :value="props.modelValue" @change="handleChange">
    <option value="0" selected>
      Filter by Rating
    </option>
    <option
      v-for="rate in rating"
      :key="rate[0]"
      :value="rate[0]"
    >
      {{ rate[1] }}
    </option>
  </select>
</template>

<style scoped>
</style>
