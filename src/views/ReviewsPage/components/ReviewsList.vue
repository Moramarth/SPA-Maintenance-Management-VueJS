<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Testimonial from '../../../components/Testimonial.vue';
import FilterByRating from '../../../components/filters/FilterByRating.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import { applyFiltersToArray, calculateTotalPages, clearFilters, getQueryset } from '../../../helpers/filterFunctions';
import { dataArrayMapping } from '../../../dataProviders/dataLoadMapping';
import { defaultPaginator } from '../../../constants/paginatorDefault';
import { filterDefault } from '../../../constants/filterDefault';

const array = ref([]);
const appliedFilters = reactive(filterDefault);
const paginator = reactive(defaultPaginator);

const currentArray = computed(() => applyFiltersToArray(array.value, appliedFilters));
const queryset = computed(() => getQueryset(currentArray.value, paginator));
const totalPages = computed(() => calculateTotalPages(currentArray.value, paginator));

onMounted (async () => {
  array.value = await dataArrayMapping.reviews();
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
        <h1>Reviews</h1>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          <div class="form-main form-main--filters">
            <div class="form__foot">
              <div class="form__col">
                <FilterByRating v-model="appliedFilters.rating" />
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

        <div class="section__body-group">
          <h1 v-if="currentArray.length === 0">
            No Reviews to show
          </h1>
          <template v-for="review in queryset" :key="review.id">
            <Testimonial
              :testimonial="review"
            />
          </template>
        </div>
        <Pagination :current-page="paginator.currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
      </div>
    </div>
  </section>
</template>

<style  scoped>
.form__foot {
  align-items: flex-end;
  justify-content: center;
}
</style>
