<script setup>
import { rating } from '../../constants/reviewRating';
import { filterElementId } from '../../helpers/filterReset';

const emit = defineEmits(['selected']);

function handleChange(event) {
  const selectedValue = event.target.value;
  emit('selected', Number(selectedValue));
}
</script>

<template>
  <select :id="filterElementId.rating" @change="handleChange">
    <option value="" selected>
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

<style lang="scss" scoped>

</style>
