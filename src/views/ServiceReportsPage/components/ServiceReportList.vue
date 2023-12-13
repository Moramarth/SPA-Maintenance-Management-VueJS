<script>
import { mapState } from 'pinia';
import { getServiceReports } from '../../../dataProviders/serviceReports';
import { useUsersStore } from '../../../stores/usersStore';
import { getCompanies } from '../../../dataProviders/companies';
import { formatDate } from '../../../helpers/formatDate';
import FilterByReportStatus from '../../../components/filters/FilterByReportStatus.vue';
import FilterByReportType from '../../../components/filters/filterByReportType.vue';
import FilterSearch from '../../../components/filters/filterSearch.vue';
import Pagination from '../../../components/Pagination.vue';

export default {
  components: {
    FilterByReportStatus,
    FilterByReportType,
    FilterSearch,
    Pagination,
  },
  data() {
    return {
      serviceReports: [],
      companies: [],
      format: formatDate,
      appliedFilters: {
        reportType: false,
        reportStatus: false,
        search: '',
      },
      paginator: {
        currentPage: 1,
        rowsPerPage: 5,
      },
    };
  },
  computed: {
    ...mapState(useUsersStore, ['getStoreProfiles', 'getCurrentUser']),
    filterReports() {
      let filteredReports = [...this.serviceReports];
      if (this.appliedFilters.reportStatus)
        filteredReports = filteredReports.filter(report => report.report_status === this.appliedFilters.reportStatus);
      if (this.appliedFilters.reportType)
        filteredReports = filteredReports.filter(report => report.report_type === this.appliedFilters.reportType);
      if (this.appliedFilters.search)
        filteredReports = filteredReports.filter(report => report.title.includes(this.appliedFilters.search));
      const startIndex = (this.paginator.currentPage - 1) * this.paginator.rowsPerPage;
      const endIndex = startIndex + this.paginator.rowsPerPage;
      return filteredReports.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.serviceReports.length / this.paginator.rowsPerPage);
    },
  },
  async created() {
    this.serviceReports = await getServiceReports();
    this.companies = await getCompanies();
  },
  methods: {
    createdBy(id) {
      const profile = this.getStoreProfiles.filter(profile => profile.user === id)[0];
      if (profile)
        return `${profile.first_name} ${profile.last_name}`;
    },
    assignedTo(id) {
      const profile = this.getStoreProfiles.filter(profile => profile.user === id)[0];
      if (profile)
        return `${profile.first_name} ${profile.last_name}`;
    },
    atCompany(id) {
      const company = this.companies.filter(company => company.id === id)[0];
      if (company)
        return company.name;
    },
    statusFilter(value) {
      this.appliedFilters.reportStatus = value;
    },
    typeFilter(value) {
      this.appliedFilters.reportType = value;
    },
    searchFilter(value) {
      this.appliedFilters.search = value;
    },
    clearFilters() {
      this.appliedFilters.reportStatus = '';
      this.$refs.statFilter.reset();

      this.appliedFilters.reportType = '';
      this.$refs.typeFilter.reset();

      this.appliedFilters.search = '';
      this.$refs.searchBar.reset();

      this.paginator.rowsPerPage = 5;
    },
    handlePageChange(newPage) {
      this.paginator.currentPage = newPage;
    },
    handleRowsPerPageChange(event) {
      this.paginator.rowsPerPage = Number(event.target.value);
      this.paginator.currentPage = 1;
    },
  },

};
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
                <FilterByReportStatus ref="statFilter" @selected="statusFilter" />
              </div>
              <div class="form__col">
                <FilterByReportType ref="typeFilter" @selected="typeFilter" />
              </div>
              <div class="form__col">
                <FilterSearch ref="searchBar" @is-searching="searchFilter" />
              </div>
            </div>
            <div class="form__foot">
              <div class="form__col">
                <label for="rowsPerPage">Rows Per Page:</label>
                <select v-model="paginator.rowsPerPage" @change="handleRowsPerPageChange">
                  <option value="5">
                    5
                  </option>
                  <option value="10">
                    10
                  </option>
                  <option value="15">
                    15
                  </option>
                  <option value="20">
                    20
                  </option>
                </select>
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
                <tr v-if="serviceReports.length === 0">
                  <td colspan="8" align="center">
                    No Service Reports to show
                  </td>
                </tr>
                <template v-else>
                  <tr v-for="object in filterReports" :key="object.id">
                    <td>{{ object.title }} </td>
                    <td v-if="getCurrentUser && (getCurrentUser.id === object.user)">
                      You
                    </td>
                    <td v-else>
                      {{ createdBy(object.user) }}
                    </td>
                    <td>{{ atCompany(object.company) }}</td>
                    <td>{{ object.report_status }}</td>
                    <td>{{ object.report_type }}</td>
                    <td>{{ format(object.submit_date) }}</td>

                    <td v-if="!object.assigned_to">
                      None
                    </td>
                    <td v-else>
                      {{ assignedTo(object.assigned_to) }}
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
