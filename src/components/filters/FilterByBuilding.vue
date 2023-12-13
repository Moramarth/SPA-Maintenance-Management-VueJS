<script>
import { getBuildings } from '../../dataProviders/buildings';

export default {
  emits: ['selected'],
  data() {
    return {
      buildings: [],
    };
  },
  async created() {
    this.buildings = await getBuildings();
  },
  methods: {
    handleSelection(event) {
      this.$emit('selected', event.target.value);
    },
    reset() {
      document.querySelector('#buildingFilter').selectedIndex = 0;
    },
  },
};
</script>

<template>
  <select id="buildingFilter" selected @change="handleSelection">
    <option>
      Filter by Building
    </option>
    <option v-for="building in buildings" :key="building.id" :value="building.name">
      {{ building.name }}
    </option>
  </select>
</template>

<style  scoped>

</style>
