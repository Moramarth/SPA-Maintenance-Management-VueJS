<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import Testimonial from '../../../components/Testimonial.vue';
import FilterByRating from '../../../components/filters/FilterByRating.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import { getReviews } from '../../../dataProviders/reviews';
import { paginationReset, ratingReset } from '../../../helpers/filterReset';

const array = ref([]);
const appliedFilters = reactive({
  reportType: false,
  reportStatus: false,
  rating: null,
});
const paginator = reactive({
  currentPage: 1,
  rowsPerPage: 5,
});

const filterReviews = computed(() => {
  let filteredReviews = [...array.value];
  if (appliedFilters.rating)
    filteredReviews = filteredReviews.filter(review => review.rating === appliedFilters.rating);
  const startIndex = (paginator.currentPage - 1) * paginator.rowsPerPage;
  const endIndex = startIndex + paginator.rowsPerPage;
  return filteredReviews.slice(startIndex, endIndex);
});
const totalPages = computed(() => {
  return Math.ceil(array.value.length / paginator.rowsPerPage);
});

onMounted (async () => {
  array.value = await getReviews();
});

function handlePageChange(newPage) {
  paginator.currentPage = newPage;
}
function handleRowsPerPageChange(value) {
  paginator.rowsPerPage = Number(value);
  paginator.currentPage = 1;
}
function handleRatingChange(value) {
  appliedFilters.rating = value;
}
function clearFilters() {
  appliedFilters.rating = 0;
  ratingReset();

  paginator.rowsPerPage = 5;
  paginationReset();
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
                <FilterByRating @selected="handleRatingChange" />
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

        <div class="section__body-group">
          <h1 v-if="array.length === 0">
            No Reviews to show
          </h1>
          <template v-for="review in filterReviews" :key="review.id">
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
