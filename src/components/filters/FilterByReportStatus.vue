<script>
export default {

  emits: ['selected'],
  data() {
    return {
      reportStatuses: [
        'Pending',
        'Assigned',
        'Done',
        'Rejected',
      ],
    };
  },
  methods: {
    handleChange(event) {
      const selectedValue = event.target.value;
      this.$emit('selected', selectedValue);
    },
    reset() {
      document.querySelector('select').selectedIndex = 0;
    },
  },
};
</script>

<template>
  <select @change="handleChange">
    <option value="" selected>
      Filter by Report Status
    </option>
    <option
      v-for="status in reportStatuses"
      :key="status"
      :value="status"
      @change="$emit('selected', value)"
    >
      {{ status }}
    </option>
  </select>
</template>

<style lang="scss" scoped>

</style>
