<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import BuildingCard from '../../../components/BuildingCard.vue';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import FilterByBuilding from '../../../components/filters/FilterByBuilding.vue';
import { dataArrayMapping } from '../../../dataProviders/dataLoadMapping';
import { defaultPaginator } from '../../../constants/paginatorDefault';
import { applyFiltersToArray, calculateTotalPages, clearFilters, getQueryset } from '../../../helpers/filterFunctions';
import { filterDefault } from '../../../constants/filterDefault';

const array = ref([]);
const appliedFilters = reactive(filterDefault);
const paginator = reactive(defaultPaginator);

const currentArray = computed(() => applyFiltersToArray(array.value, appliedFilters));
const queryset = computed(() => getQueryset(currentArray.value, paginator));
const totalPages = computed(() => calculateTotalPages(currentArray.value, paginator));

onMounted(async () => {
  array.value = await dataArrayMapping.buildings();
});

watch(() => paginator.rowsPerPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    paginator.currentPage = 1;
  }
});

function handlePageChange(newPage) {
  paginator.currentPage = newPage;
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
                  <FilterByBuilding v-model="appliedFilters.building" />
                </div>
                <div class="form__col">
                  <PaginationSelector v-model="paginator.rowsPerPage" />
                </div>
                <div class="form__col">
                  <button class="btn btn-primary" @click="clearFilters(appliedFilters, paginator)">
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section__body-group">
          <h1 v-if="currentArray.length === 0">
            No Buildings to show
          </h1>
          <div v-else class="row row-cols-1 row-cols-md-3 g-4">
            <template v-for="building in queryset" :key="building.id">
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
