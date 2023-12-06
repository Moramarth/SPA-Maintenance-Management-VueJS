<script>
export default {
  props: {
    assignments: {
      type: Array,
      required: false,
      default: () => {
        return [{
          id: -1,
          serviceReport: 'Service Report Title',
          assignedTo: 'Assigned to info',
          assignedBy: 'Assigned by info',
          status: 'Assignment status',
          reportType: 'Report Type',
          meeting: 'meeting',
          offer: 'offer',
          lastUpdated: 'last updated',
          details: 'details',

        }];
      },

    },
  },
};
</script>

<template>
  <div class="section__body-group">
    filters
  </div>

  <div class="section__body-group">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr class="table table-light">
            <th>Service Report</th>
            <th>Assigned to</th>
            <th>Assigned by</th>
            <th>Status</th>
            <th>Report Type</th>
            <th>Meeting</th>
            <th>Offer</th>
            <th>Last Updated</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="assignments.length === 0">
            <td colspan="8" align="center">
              No Assignments to show
            </td>
          </tr>
          <template v-else>
            <tr v-for="assignment in assignments" :key="assignment.id">
              <td>{{ assignment.serviceReport }}</td>
              <!-- {% if request.user == object.user %}
            <td>You</td>
            {% else %} -->
              <td>{{ assignment.assignedTo }}</td>
              <!-- {% endif %} -->
              <!-- {% if request.user == object.assigned_by %}
            <td>You</td>
            {% else %} -->
              <td>{{ assignment.assignedBy }}</td>
              <!-- {% endif %} -->
              <td>{{ assignment.status }}</td>
              <td>{{ assignment.report_type }}</td>
              <!-- {% if object.meeting_required %} -->
              <td v-if="assignment.meeting">
                <i class="fa-solid fa-circle-check" />
              </td>
              <td v-else>
                <i class="fa-solid fa-circle-xmark" />
              </td>

              <td v-if="assignment.offer">
                <i class="fa-solid fa-circle-check" />
              </td>

              <td v-else>
                <i class="fa-solid fa-circle-xmark" />
              </td>

              <td>{{ assignment.lastUpdated }}</td>
              <td>
                <a
                  class="btn btn-outline-primary"
                  href="#"
                >See
                  Details</a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div>pagination</div>
  </div>
</template>

<style scoped>

</style>
