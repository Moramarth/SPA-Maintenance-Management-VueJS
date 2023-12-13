<script>
export default {

  emits: ['selected'],
  data() {
    return {
      reportType: [
        'Other',
        'Networking',
        'Electrical',
        'Plumbing',
        'Structural Integrity',
        'Security Systems',
        'Landscaping',
      ],
    };
  },
  methods: {
    handleChange(event) {
      const selectedValue = event.target.value;
      this.$emit('selected', selectedValue);
    },
    reset() {
      document.querySelectorAll('select')[1].selectedIndex = 0;
    },
  },
};
</script>

<template>
  <select @change="handleChange">
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
