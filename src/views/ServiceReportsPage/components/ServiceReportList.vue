<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useUsersStore } from '../../../stores/usersStore';
import { formatDate } from '../../../helpers/formatDate';
import FilterByReportStatus from '../../../components/filters/FilterByReportStatus.vue';
import FilterByReportType from '../../../components/filters/filterByReportType.vue';
import FilterSearch from '../../../components/filters/filterSearch.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import { paginationReset, reportStatusSelectorReset, reportTypeSelectorReset, searchReset } from '../../../helpers/filterReset';
import { dataArrayMapping } from '../../../dataProviders/dataLoadMapping';

const userStore = useUsersStore();

const array = ref([]);
const appliedFilters = reactive({
  reportType: false,
  reportStatus: false,
  search: '',
});
const paginator = reactive({
  currentPage: 1,
  rowsPerPage: 5,
});

const filterReports = computed(() => {
  let filteredReports = [...array.value];
  if (appliedFilters.reportStatus)
    filteredReports = filteredReports.filter(report => report.report_status === appliedFilters.reportStatus);
  if (appliedFilters.reportType)
    filteredReports = filteredReports.filter(report => report.report_type === appliedFilters.reportType);
  if (appliedFilters.search)
    filteredReports = filteredReports.filter(report => report.title.includes(appliedFilters.search));
  const startIndex = (paginator.currentPage - 1) * paginator.rowsPerPage;
  const endIndex = startIndex + paginator.rowsPerPage;
  return filteredReports.slice(startIndex, endIndex);
});
const totalPages = computed(() => {
  return Math.ceil(array.value.length / paginator.rowsPerPage);
});

onMounted(async () => {
  array.value = await dataArrayMapping.serviceReports();
});
function statusFilter(value) {
  appliedFilters.reportStatus = value;
}
function typeFilter(value) {
  appliedFilters.reportType = value;
}
function searchFilter(value) {
  appliedFilters.search = value;
}
function clearFilters() {
  appliedFilters.reportStatus = '';
  searchReset();

  appliedFilters.reportType = '';
  reportTypeSelectorReset();

  appliedFilters.search = '';
  reportStatusSelectorReset();

  paginator.rowsPerPage = 5;
  paginationReset();
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
        <h1>Service Reports</h1>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          <div class="form-main form-main--filters">
            <div class="form__wrap">
              <div class="form__col">
                <FilterByReportStatus @selected="statusFilter" />
              </div>
              <div class="form__col">
                <FilterByReportType @selected="typeFilter" />
              </div>
              <div class="form__col">
                <FilterSearch @is-searching="searchFilter" />
              </div>
            </div>
            <div class="form__foot">
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
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr class="table table-light">
                  <th>Title</th>
                  <th>Created by</th>
                  <th>Company</th>
                  <th>Report Status</th>
                  <th>Report Type</th>
                  <th>Submit Date</th>
                  <th>Assigned to</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="array.length === 0">
                  <td colspan="8" align="center">
                    No Service Reports to show
                  </td>
                </tr>
                <template v-else>
                  <tr v-for="object in filterReports" :key="object.id">
                    <td>{{ object.title }} </td>
                    <td v-if="userStore.getCurrentUser && (userStore.getCurrentUser.id === object.user)">
                      You
                    </td>
                    <td v-else>
                      {{ object.user_full_name }}
                    </td>
                    <td>{{ object.user_company_name }}</td>
                    <td>{{ object.report_status }}</td>
                    <td>{{ object.report_type }}</td>
                    <td>{{ formatDate(object.submit_date) }}</td>

                    <td v-if="!object.assigned_to">
                      None
                    </td>
                    <td v-else>
                      {{ object.assigned_to_full_name }}
                    </td>

                    <td>
                      <router-link class="btn btn-outline-primary" :to="{ name: 'service-report-details', params: { id: object.id } }">
                        See
                        Details
                      </router-link>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <Pagination :current-page="paginator.currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
        </div>
      </div>
    </div>
  </section>
</template>

<style  scoped>
.form__foot {
  align-items: flex-end;
  justify-content: center;

}
label {
text-align: center;
}
</style>
