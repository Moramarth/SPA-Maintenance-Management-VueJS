<script>
export default {
  emits: ['selected'],
  data() {
    return {
      rating: [
        [1, 'Very Bad'],
        [2, 'Bad'],
        [3, 'Good'],
        [4, 'Very good'],
        [5, 'Excellent'],
      ],
    };
  },
  methods: {
    handleChange(event) {
      const selectedValue = event.target.value;
      this.$emit('selected', Number(selectedValue));
    },
    reset() {
      console.log('reset');
      document.querySelector('#rating').selectedIndex = 0;
    },
  },
};
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
