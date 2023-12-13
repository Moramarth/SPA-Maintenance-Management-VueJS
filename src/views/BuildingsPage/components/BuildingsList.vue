<script>
import BuildingCard from '../../../components/BuildingCard.vue';
import { getBuildings } from '../../../dataProviders/buildings';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import FilterByBuilding from '../../../components/filters/FilterByBuilding.vue';

export default {
  components: {
    BuildingCard,
    Pagination,
    PaginationSelector,
    FilterByBuilding,
  },
  data() {
    return {
      array: [],
      appliedFilters: {
        buildingName: '',
      },
      paginator: {
        currentPage: 1,
        rowsPerPage: 5,
      },
    };
  },

  computed: {
    filterBuildings() {
      let filteredBuildings = [...this.array];

      if (this.appliedFilters.buildingName) {
        filteredBuildings = filteredBuildings.filter(building => building.name === this.appliedFilters.buildingName);
      }
      const startIndex = (this.paginator.currentPage - 1) * this.paginator.rowsPerPage;
      const endIndex = startIndex + this.paginator.rowsPerPage;
      return filteredBuildings.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filterBuildings.length / this.paginator.rowsPerPage);
    },
  },
  async created() {
    this.array = await getBuildings();
  },
  methods: {
    clearFilters() {
      this.appliedFilters.buildingName = '';
      this.$refs.buildingFilter.reset();

      this.paginator.rowsPerPage = 5;
      this.$refs.itemsOnPage.reset();
    },
    buildingFilter(value) {
      this.appliedFilters.buildingName = value;
    },
    handlePageChange(newPage) {
      this.paginator.currentPage = newPage;
    },
    handleRowsPerPageChange(value) {
      this.paginator.rowsPerPage = Number(value);
      this.paginator.currentPage = 1;
    },
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
          <div class="form-main form-main--filters">
            <div class="form__wrap">
              <div class="form__foot">
                <div class="form__col">
                  <FilterByBuilding ref="buildingFilter" @selected="buildingFilter" />
                </div>
                <div class="form__col">
                  <PaginationSelector ref="itemsOnPage" @change-row="handleRowsPerPageChange" />
                </div>
                <div class="form__col">
                  <button class="btn btn-primary" @click="clearFilters">
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section__body-group">
          <h1 v-if="array.length === 0">
            No Buildings to show
          </h1>
          <div v-else class="row row-cols-1 row-cols-md-3 g-4">
            <template v-for="building in filterBuildings" :key="building.id">
              <BuildingCard :building="building" />
            </template>
          </div>
        </div>
        <Pagination :current-page="paginator.currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.form__foot {
  align-items: flex-end;
  justify-content: center;

}
</style>
