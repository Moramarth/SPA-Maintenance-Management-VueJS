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
          title: 'offer title',
          additionalInformation: 'More info here',
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

        <a class="btn btn-warning" href="{% url 'edit expense' object.pk %}">Edit</a>
        <a class="btn btn-danger" href="{% url 'delete expense' object.pk %}">Delete</a>

        <!-- {% endif %} -->
        <a class="btn btn-primary" href="{% url 'show all expenses' %}">Back to Offers</a>
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
              <a href="{% url 'assignment details' object.assignment.pk %}" target="_blank">
                <i
                  class="fa-solid fa-arrow-right-to-bracket"
                  data-toggle="tooltip"
                  title="See Details"
                />
              </a>
            </td>
          </tr>
          <tr>
            <th>
              Title:
            </th>
            <td>
              {{ object.title }}
            </td>
          </tr>
          <tr>
            <th>More info:</th>
            <td>{{ object.additionalInformation }}</td>
          </tr>
          <tr>
            <th>Created by:</th>
            <td>
              {{ object.createdBy }}
              <a href="{% url 'profile details' object.created_by.pk %}" target="_blank">
                <i
                  class="fa-solid fa-circle-info"
                  data-toggle="tooltip"
                  title="Contact Info"
                />
              </a>
            </td>
          </tr>
          <!-- {% if object.file %} -->
          <tr>
            <th>
              Attached file:
            </th>
            <td>
              Offer- TODO: extra information here
              <a
                href="#"
                target="_blank"
              >
                <i
                  class="fa-regular fa-file"
                  data-toggle="tooltip"
                  title="View File"
                /></a>

              <a href="#">
                <i
                  class="fa-regular fa-floppy-disk"
                  data-toggle="tooltip"
                  title="Download"
                /></a>
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
