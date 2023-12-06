<script>
export default {
  props: {
    serviceReports: {
      type: Array,
      required: false,
      default: () => {
        return [{
          id: -1,
          title: 'Service Report Title',
          createdBy: 'Created by full name',
          company: 'Company name',
          reportStatus: 'Assignment status',
          reportType: 'Report Type',
          submitDate: 'data submited',
          assignedTo: 'Assigned to full name',
          details: 'details',

        }];
      },

    },
  },
};
</script>

<template>
  <div class="section__body-group">
    <!-- {% if viewer_group.name == "Supervisor" %} -->
    <a class="btn btn-outline-danger" href="#">Auto assign reports</a>
    <!-- {% endif %} -->
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
              <td>{{ object.createdBy }}</td>
              <!-- {% endif %} -->
              <td>{{ object.company }}</td>
              <td>{{ object.reportStatus }}</td>
              <td>{{ object.reportType }}</td>
              <td>{{ object.submitDate }}</td>

              <td v-if="!object.assignedTo">
                None
              </td>
              <!-- {% elif request.user == object.assigned_to %}
            <td>You</td>
            {% else %} -->
              <td v-else>
                {{ object.assignedTo }}
              </td>

              <td>
                <a class="btn btn-outline-primary" href="{% url 'report details' object.pk %}">See
                  Details</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    pagination
  </div>
</template>

<style lang="scss" scoped>

</style>
