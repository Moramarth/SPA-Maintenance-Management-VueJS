<script>
import { getServiceReports } from '../../../dataProviders/serviceReports';

export default {
  data() {
    return {
      serviceReports: [
        {
          id: -1,
          title: 'Service Report Title',
          user: 'Created by full name',
          company: 'Company name',
          report_status: 'Assignment status',
          report_type: 'Report Type',
          submit_date: 'data submited',
          assigned_to: 'Assigned to full name',
          details: 'details',

        },
      ],
    };
  },
  async created() {
    this.serviceReports = await getServiceReports();
    console.log(this.serviceReports);
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
                    <!-- {% if request.user == object.user %}
            <td>You</td>
            {% else %} -->
                    <td>{{ object.user }}</td>
                    <!-- {% endif %} -->
                    <td>{{ object.company }}</td>
                    <td>{{ object.report_status }}</td>
                    <td>{{ object.report_type }}</td>
                    <td>{{ object.submit_date }}</td>

                    <td v-if="!object.assigned_to">
                      None
                    </td>
                    <!-- {% elif request.user == object.assigned_to %}
            <td>You</td>
            {% else %} -->
                    <td v-else>
                      {{ object.assigned_to }}
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
