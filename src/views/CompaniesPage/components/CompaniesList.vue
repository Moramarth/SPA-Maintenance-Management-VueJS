<script>
import CompanyCard from '../../../components/CompanyCard.vue';
import { getCompanies } from '../../../dataProviders/companies';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import FilterSearch from '../../../components/filters/FilterSearch.vue';
import { paginationReset } from '../../../helpers/filterReset';

export default {
  components: {
    CompanyCard,
    Pagination,
    PaginationSelector,
    FilterSearch,

  },
  data() {
    return {
      array: [],
      appliedFilters: {
        search: '',
      },
      paginator: {
        currentPage: 1,
        rowsPerPage: 5,
      },
    };
  },
  computed: {
    filterCompanies() {
      let filteredCompanies = [...this.array];

      if (this.appliedFilters.search)
        filteredCompanies = filteredCompanies.filter(company => company.name.includes(this.appliedFilters.search));
      const startIndex = (this.paginator.currentPage - 1) * this.paginator.rowsPerPage;
      const endIndex = startIndex + this.paginator.rowsPerPage;
      return filteredCompanies.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filterCompanies.length / this.paginator.rowsPerPage);
    },
  },
  async created() {
    this.array = await getCompanies();
  },
  methods: {
    clearFilters() {
      this.appliedFilters.search = '';
      this.$refs.search.reset();

      this.paginator.rowsPerPage = 5;
      paginationReset();
    },
    searchFilter(value) {
      this.appliedFilters.search = value;
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
        <h1>Our partners</h1>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          <div class="form-main form-main--filters">
            <div class="form__wrap">
              <div class="form__foot">
                <div class="form__col">
                  <FilterSearch ref="search" @is-searching="searchFilter" />
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
            No Partners to show
          </h1>
          <div v-else class="row row-cols-1 row-cols-md-3 g-4">
            <template v-for="company in filterCompanies" :key="company.id">
              <CompanyCard :company="company" />
            </template>
          </div>
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
