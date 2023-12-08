<script>
import BuildingCard from '../../../components/BuildingCard.vue';

export default {
  components: {
    BuildingCard,
  },
  props: {
    array: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="section__body-group">
    filters
  </div>
  <div class="section__body-group">
    <h1 v-if="array.length === 0">
      No Buildings to show
    </h1>
    <div v-else class="row row-cols-1 row-cols-md-3 g-4">
      <template v-for="building in array" :key="building.id">
        <BuildingCard :building="building" />
      </template>
    </div>
  </div>
  paginated
</template>

<style lang="scss" scoped>

</style>
