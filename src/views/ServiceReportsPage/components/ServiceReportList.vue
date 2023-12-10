<script>
import { mapActions, mapState } from 'pinia';
import { getServiceReports } from '../../../dataProviders/serviceReports';
import { useUsersStore } from '../../../stores/usersStore';
import { getCompanies } from '../../../dataProviders/companies';
import { formatDate } from '../../../helpers/formatDate';

export default {
  data() {
    return {
      serviceReports: [],
      companies: [],
      format: formatDate,
    };
  },
  computed: {
    ...mapState(useUsersStore, ['getProfiles', 'getCurrentUser']),
  },
  async created() {
    // TODO: better API calls for performance
    this.serviceReports = await getServiceReports();
    this.companies = await getCompanies();
    this.loadProfiles();
  },
  methods: {
    ...mapActions(useUsersStore, ['loadProfiles']),
    createdBy(id) {
      const profile = this.getProfiles.filter(profile => profile.user === id)[0];
      if (profile)
        return `${profile.first_name} ${profile.last_name}`;
    },
    assignedTo(id) {
      const profile = this.getProfiles.filter(profile => profile.user === id)[0];
      if (profile)
        return `${profile.first_name} ${profile.last_name}`;
    },
    atCompany(id) {
      const company = this.companies.filter(company => company.id === id)[0];
      if (company)
        return company.name;
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
          filters
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
                  <tr v-for="object in serviceReports" :key="object.id">
                    <td>{{ object.title }} </td>
                    <td v-if="getCurrentUser && (getCurrentuser.id === object.user)">
                      You
                    </td>
                    <td v-else>
                      {{ createdBy(object.user) }}
                    </td>
                    <!-- {% endif %} -->
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
          pagination
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
