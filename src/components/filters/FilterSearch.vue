<script>
export default {
  emits: ['isSearching'],
  methods: {
    reset() {
      document.querySelector('input').value = '';
    },
    handleSearch(event) {
      const searchedValue = event.target.value;
      this.$emit('isSearching', searchedValue);
    },
  },
};
</script>

<template>
  <input type="text" placeholder="Search in titles" @change="handleSearch">
</template>

<style lang="scss" scoped>

</style>
