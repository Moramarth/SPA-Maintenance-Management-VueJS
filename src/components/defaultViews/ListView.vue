<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { filterDefault } from '../../constants/filterDefault';
import { defaultPaginator } from '../../constants/paginatorDefault';
import { applyFiltersToArray, calculateTotalPages, clearFilters, getQueryset } from '../../helpers/filterFunctions';
import { dataArrayMapping } from '../../dataProviders/dataLoadMapping';
import Pagination from '../pagination/Pagination.vue';
import PaginationSelector from '../pagination/PaginationSelector.vue';
import FilterByBuilding from '../filters/FilterByBuilding.vue';
import FilterByRating from '../filters/FilterByRating.vue';
import FilterByReportStatus from '../filters/FilterByReportStatus.vue';
import FilterByReportType from '../filters/FilterByReportType.vue';
import FilterSearch from '../filters/FilterSearch.vue';

const props = defineProps({
  typeOfList: {
    type: String,
    required: true,
  },
  objectsListedAs: {
    type: Object,
    required: true,
  },
  desiredFilters: {
    type: Object,
    required: true,
  },
  searchKeywordIfApplicable: {
    type: String,
  },
  colspanWhenTableIsEmpty: {
    type: Number,
  },
});

const array = ref([]);
const appliedFilters = reactive(structuredClone(filterDefault));
const paginator = reactive(structuredClone(defaultPaginator));

const currentArray = computed(() => applyFiltersToArray(array.value, appliedFilters, props.searchKeywordIfApplicable));
const queryset = computed(() => getQueryset(currentArray.value, paginator));
const totalPages = computed(() => calculateTotalPages(currentArray.value, paginator));

onMounted(async () => {
  array.value = await dataArrayMapping[props.typeOfList]();
});

watch(() => paginator.rowsPerPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    paginator.currentPage = 1;
  }
});
Object.keys(appliedFilters).forEach(key => watch(() => appliedFilters[key], (newValue, oldValue) => {
  if (newValue !== oldValue) {
    paginator.currentPage = 1;
  }
}));

function handlePageChange(newPage) {
  paginator.currentPage = newPage;
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>
          <slot name="page-header" />
        </h1>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          <div class="form-main form-main--filters">
            <div class="form__wrap">
              <div v-if="props.desiredFilters.byBuilding" class="form__col">
                <FilterByBuilding v-model="appliedFilters.building" />
              </div>
              <div v-if="props.desiredFilters.byRating" class="form__col">
                <FilterByRating v-model="appliedFilters.rating" />
              </div>
              <div v-if="props.desiredFilters.byReportStatus" class="form__col">
                <FilterByReportStatus v-model="appliedFilters.reportStatus" />
              </div>
              <div v-if="props.desiredFilters.byReportType" class="form__col">
                <FilterByReportType v-model="appliedFilters.reportType" />
              </div>
              <div v-if="props.desiredFilters.bySearch" class="form__col">
                <FilterSearch v-model="appliedFilters.search" :keyword="props.searchKeywordIfApplicable" />
              </div>
            </div>
            <div class="form__foot">
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
        <div class="section__body-group">
          <template v-if="props.objectsListedAs.table">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr class="table table-light">
                    <slot name="table-headers" />
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="currentArray.length === 0">
                    <td class="empty-table" :colspan="props.colspanWhenTableIsEmpty ? props.colspanWhenTableIsEmpty : 1 ">
                      <slot name="empty-table-message" />
                    </td>
                  </tr>
                  <template v-else>
                    <tr v-for="object in queryset" :key="object.id">
                      <slot name="object-data-row" v-bind="object" />
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </template>
          <template v-else-if="props.objectsListedAs.cards">
            <h1 v-if="currentArray.length === 0" class="empty-cards-list">
              <slot name="empty-cards-list" />
            </h1>
            <div v-else class="row row-cols-1 row-cols-md-3 g-4">
              <template v-for="object in queryset" :key="object.id">
                <slot name="card-slot" v-bind="object" />
              </template>
            </div>
          </template>
          <template v-else-if="props.objectsListedAs.testimonials">
            <h1 v-if="currentArray.length === 0" class="empty-cards-list">
              <slot name="empty-testimonials-list" />
            </h1>

            <template v-for="object in queryset" :key="object.id">
              <slot name="card-slot" v-bind="object" />
            </template>
          </template>
          <Pagination :current-page="paginator.currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.empty-table,
.empty-cards-list {
  text-align: center;
}
.empty-cards-list {
  margin: 1rem auto;
}

.form__foot {
  align-items: flex-end;
  justify-content: center;
}
label {
text-align: center;
}
</style>
