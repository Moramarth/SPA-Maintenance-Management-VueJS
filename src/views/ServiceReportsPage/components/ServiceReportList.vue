<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useUsersStore } from '../../../stores/usersStore';
import { formatDate } from '../../../helpers/formatDate';
import FilterByReportStatus from '../../../components/filters/FilterByReportStatus.vue';
import FilterByReportType from '../../../components/filters/filterByReportType.vue';
import FilterSearch from '../../../components/filters/filterSearch.vue';
import Pagination from '../../../components/pagination/Pagination.vue';
import PaginationSelector from '../../../components/pagination/PaginationSelector.vue';
import { applyFiltersToArray, calculateTotalPages, clearFilters, getQueryset } from '../../../helpers/filterFunctions';
import { dataArrayMapping } from '../../../dataProviders/dataLoadMapping';
import { defaultPaginator } from '../../../constants/paginatorDefault';
import { filterDefault } from '../../../constants/filterDefault';

const userStore = useUsersStore();

const array = ref([]);
const appliedFilters = reactive(filterDefault);
const paginator = reactive(defaultPaginator);

const currentArray = computed(() => applyFiltersToArray(array.value, appliedFilters, 'title'));
const queryset = computed(() => getQueryset(currentArray.value, paginator));
const totalPages = computed(() => calculateTotalPages(currentArray.value, paginator));

onMounted(async () => {
  array.value = await dataArrayMapping.serviceReports();
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
        <h1>Service Reports</h1>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          <div class="form-main form-main--filters">
            <div class="form__wrap">
              <div class="form__col">
                <FilterByReportStatus v-model="appliedFilters.reportStatus" />
              </div>
              <div class="form__col">
                <FilterByReportType v-model="appliedFilters.reportType" />
              </div>
              <div class="form__col">
                <FilterSearch v-model="appliedFilters.search" />
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
                <tr v-if="currentArray.length === 0">
                  <td colspan="8" align="center">
                    No Service Reports to show
                  </td>
                </tr>
                <template v-else>
                  <tr v-for="object in queryset" :key="object.id">
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
