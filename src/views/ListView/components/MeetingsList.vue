<script>
export default {
  props: {
    meetings: {
      type: Array,
      required: false,
      default: () => {
        return [{
          createdBy: 'Full name',
          forAssignment: 'service report title',
          description: 'description',
          meetingDate: 'day to meet',
        }, {
          createdBy: 'Full name',
          forAssignment: 'service report title',
          description: 'description',
          meetingDate: 'day to meet',
        }, { createdBy: 'Full name', forAssignment: 'service report title', description: 'description', meetingDate: 'day to meet' }];
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
            <th>Created by</th>
            <th>For Assignment</th>
            <th>Description</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="meetings.lenght === 0">
            <td colspan="8" align="center">
              No Meeting to show
            </td>
          </tr>
          <template v-else>
            <tr v-for="object in meetings" :key="object.id">
              <td>{{ object.createdBy }}</td>
              <td>{{ object.forAssignment }}</td>
              <td>{{ object.description }}</td>
              <td>{{ object.meetingDate }}</td>
              <td>
                <a class="btn btn-outline-primary" href="{% url 'meeting details' object.pk %}">See
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
