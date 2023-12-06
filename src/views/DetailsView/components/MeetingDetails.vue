<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          createdBy: 'Created By user',
          assignment: 'Assignment title',
          description: 'Some description here',
          meetingDate: 'Meeting date',
        };
      },
    },
  },
};
</script>

<template>
  <div class="form-main form-main--filters">
    <div class="form__wrap">
      <div class="form__foot">
        <!-- {% if request.user == object.created_by %} -->

        <a class="btn btn-warning" href="#">Edit Meeting</a>
        <a class="btn btn-danger" href="#">Delete Meeting</a>

        <!-- {% endif %} -->
        <a class="btn btn-primary" href="#">Back to Meetings</a>
      </div>
    </div>
  </div>
  <div class="section__body-group">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr class="table table-light">
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>For assignment:</th>
            <td>
              {{ object.assignment }}
              <a href="#" target="_blank">
                <i
                  class="fa-solid fa-arrow-right-to-bracket"
                  data-toggle="tooltip"
                  title="See Details"
                />
              </a>
            </td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{{ object.description }}</td>
          </tr>
          <tr>
            <th>Meeting date:</th>
            <td>{{ object.meetingDate }}</td>
          </tr>
          <tr>
            <th>Created by:</th>
            <td>
              {{ object.createdBy }}
              <a href="#" target="_blank">
                <i
                  class="fa-solid fa-circle-info"
                  data-toggle="tooltip"
                  title="Contact Info"
                />
              </a>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr class="table table-light">
            <th />
            <th />
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
