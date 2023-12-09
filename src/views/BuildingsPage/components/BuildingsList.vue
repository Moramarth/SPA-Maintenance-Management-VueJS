<script>
import BuildingCard from '../../../components/BuildingCard.vue';
import { getBuildings } from '../../../dataProviders/buildings';

export default {
  components: {
    BuildingCard,
  },
  data() {
    return {
      array: [],
    };
  },
  async created() {
    this.array = await getBuildings();
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Our Buildings</h1>
      </div>
      <div class="section__body">
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
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
