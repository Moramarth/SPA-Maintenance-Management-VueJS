<script setup>
const emit = defineEmits(['selected']);

const rating = [
  [1, 'Very Bad'],
  [2, 'Bad'],
  [3, 'Good'],
  [4, 'Very good'],
  [5, 'Excellent'],
];

function handleChange(event) {
  const selectedValue = event.target.value;
  emit('selected', Number(selectedValue));
}
</script>

<template>
  <select id="rating" @change="handleChange">
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
