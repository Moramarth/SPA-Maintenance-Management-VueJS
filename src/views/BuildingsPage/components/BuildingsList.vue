<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import BuildingCard from '../../../components/BuildingCard.vue';
import { getBuildings } from '../../../dataProviders/buildings';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import FilterByBuilding from '../../../components/filters/FilterByBuilding.vue';
import { buildingFilterReset, paginationReset } from '../../../helpers/filterReset';

const array = ref([]);
const appliedFilters = reactive({
  buildingName: '',
});
const paginator = reactive({
  currentPage: 1,
  rowsPerPage: 5,
});

const filterBuildings = computed(() => {
  let filteredBuildings = [...array.value];

  if (appliedFilters.buildingName) {
    filteredBuildings = filteredBuildings.filter(building => building.name === appliedFilters.buildingName);
  }
  const startIndex = (paginator.currentPage - 1) * paginator.rowsPerPage;
  const endIndex = startIndex + paginator.rowsPerPage;
  return filteredBuildings.slice(startIndex, endIndex);
});
const totalPages = computed(() => {
  return Math.ceil(filterBuildings.value.length / paginator.rowsPerPage);
});
onMounted(async () => {
  array.value = await getBuildings();
});

function clearFilters() {
  appliedFilters.buildingName = '';
  buildingFilterReset();

  paginator.rowsPerPage = 5;
  paginationReset();
}
function buildingFilter(value) {
  appliedFilters.buildingName = value;
}
function handlePageChange(newPage) {
  paginator.currentPage = newPage;
}
function handleRowsPerPageChange(value) {
  paginator.rowsPerPage = Number(value);
  paginator.currentPage = 1;
}
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
                  <FilterByBuilding @selected="buildingFilter" />
                </div>
                <div class="form__col">
                  <PaginationSelector @change-row="handleRowsPerPageChange" />
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
