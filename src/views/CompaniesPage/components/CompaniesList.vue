<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import CompanyCard from '../../../components/CompanyCard.vue';
import { getCompanies } from '../../../dataProviders/companies';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import FilterSearch from '../../../components/filters/FilterSearch.vue';
import { paginationReset, searchReset } from '../../../helpers/filterReset';

const array = ref([]);
const appliedFilters = reactive({
  search: '',
});
const paginator = reactive({
  currentPage: 1,
  rowsPerPage: 5,
});

const filterCompanies = computed(() => {
  let filteredCompanies = [...array.value];

  if (appliedFilters.search)
    filteredCompanies = filteredCompanies.filter(company => company.name.includes(appliedFilters.search));
  const startIndex = (paginator.currentPage - 1) * paginator.rowsPerPage;
  const endIndex = startIndex + paginator.rowsPerPage;
  return filteredCompanies.slice(startIndex, endIndex);
});
const totalPages = computed(() => {
  return Math.ceil(filterCompanies.value.length / paginator.rowsPerPage);
});

onMounted (async () => {
  array.value = await getCompanies();
});

function clearFilters() {
  appliedFilters.search = '';
  searchReset();

  paginator.rowsPerPage = 5;
  paginationReset();
}
function searchFilter(value) {
  appliedFilters.search = value;
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
        <h1>Our partners</h1>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          <div class="form-main form-main--filters">
            <div class="form__wrap">
              <div class="form__foot">
                <div class="form__col">
                  <FilterSearch @is-searching="searchFilter" />
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
