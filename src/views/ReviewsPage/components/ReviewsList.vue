<script>
import Testimonial from '../../../components/Testimonial.vue';
import FilterByRating from '../../../components/filters/FilterByRating.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import { getReviews } from '../../../dataProviders/reviews';

export default {
  components: {
    Testimonial,
    Pagination,
    PaginationSelector,
    FilterByRating,
  },

  data() {
    return {
      array: [],
      appliedFilters: {
        reportType: false,
        reportStatus: false,
        rating: null,
      },
      paginator: {
        currentPage: 1,
        rowsPerPage: 5,
      },
    };
  },
  computed: {
    filterReviews() {
      let filteredReviews = [...this.array];
      if (this.appliedFilters.rating)
        filteredReviews = filteredReviews.filter(review => review.rating === this.appliedFilters.rating);
      const startIndex = (this.paginator.currentPage - 1) * this.paginator.rowsPerPage;
      const endIndex = startIndex + this.paginator.rowsPerPage;
      return filteredReviews.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.array.length / this.paginator.rowsPerPage);
    },
  },

  async created() {
    this.array = await getReviews();
  },
  methods: {
    handlePageChange(newPage) {
      this.paginator.currentPage = newPage;
    },
    handleRowsPerPageChange(value) {
      this.paginator.rowsPerPage = Number(value);
      this.paginator.currentPage = 1;
    },
    handleRatingChange(value) {
      this.appliedFilters.rating = value;
    },
    clearFilters() {
      this.appliedFilters.rating = 0;
      this.$refs.rating.reset();

      this.paginator.rowsPerPage = 5;
      this.$refs.itemsOnPage.reset();
    },
  },

};
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
                <FilterByRating ref="rating" @selected="handleRatingChange" />
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
