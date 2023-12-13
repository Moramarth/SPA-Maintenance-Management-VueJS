<script>
export default {
  emits: ['changeRow'],
  methods: {
    handleRowsPerPageChange(event) {
      this.$emit('changeRow', event.target.value);
    },
    reset() {
      document.querySelector('#item-per-page-choice').selectedIndex = 0;
    },
  },

};
</script>

<template>
  <label for="rowsPerPage">Items Per Page:</label>
  <select id="item-per-page-choice" @change="handleRowsPerPageChange">
    <option value="5">
      5
    </option>
    <option value="10">
      10
    </option>
    <option value="15">
      15
    </option>
    <option value="20">
      20
    </option>
  </select>
</template>

<style  scoped>
label {
  text-align: center;
}
</style>
