<script>
import { getBuildings } from '../../dataProviders/buildings';

export default {
  data() {
    return {
      buildings: [],
    };
  },
  async created() {
    this.buildings = await getBuildings();
  },
};
</script>

<template>
  <select>
    <option value="" selected>
      Filter by Building
    </option>
    <option v-for="building in buildings" :key="building.id" :value="building.name">
      {{ building.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped>

</style>
