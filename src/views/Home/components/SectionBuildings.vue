<script>
import BuildingCard from '../../../components/BuildingCard.vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';

export default {
  components: {
    BuildingCard,
    LoadSpinner,
  },
  props: {
    buildings: {
      type: Array,
      required: true,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <template v-else>
    <div class="section__body-group-head">
      <h4>Our Buildings</h4>

      <router-link class="btn btn-dark" :to="{ name: 'show-all-buildings' }">
        See all buildings
      </router-link>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <template v-if="buildings.length === 0">
        <h2>No Buildings to show</h2>
      </template>
      <template v-else>
        <BuildingCard v-for="building in buildings" :key="building.id" :building="building" />
      </template>
    </div>
  </template>
</template>

<style  scoped>

</style>
