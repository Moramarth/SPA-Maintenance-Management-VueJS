<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return { dateAssigned: 'Assigned date', serviceReport: 'For service report title', assignedBy: 'who assigned it full name', assignetTo: 'who is assigned to', status: 'status', meeting: 'meeting', offer: 'offer', lastUpdated: 'Date last updated' };
      },
    },
  },
};
</script>

<template>
  <!-- actions -->
  <!-- <div class="form-main form-main--filters">
    <div class="form__wrap">
      <div class="form__foot">
        {% if object.assignment_status != "Done" %}

        {% if viewer_group.name == "Supervisor" %}
        {% if assignment.assignment_status != "Accepted" %}
        <a class="btn btn-warning" href="#">Edit</a>
        <a class="btn btn-danger" href="#">Delete</a>
        {% else %}
        <a class="btn btn-success" href="#">Done</a>
        {% endif %}

        {% elif viewer_group.name == "Engineering" %}
        {% if request.user == object.assigned_by %}
        {% if object.assignment_status != "Accepted" %}
        <a class="btn btn-warning" href="#">Edit</a>
        {% else %}
        <a class="btn btn-success" href="#">Done</a>
        {% endif %}
        {% else %}
        {% if object.assignment_status != "Accepted" %}
        <a class="btn btn-success" href="#">Accept</a>
        <a class="btn btn-danger" href="#">Reject</a>
        {% else %}
        <a class="btn btn-success" href="#">Done</a>
        {% endif %}
        {% endif %}

        {% elif viewer_group.name == "Contractors" and object.assignment_status != "Accepted" %}
        <a class="btn btn-success" href="#">Accept</a>
        <a class="btn btn-danger" href="#">Reject</a>
        {% endif %}

        {% endif %}

        <a class="btn btn-primary" href="#">Back to
          Assignments</a>
      </div>
    </div>
  </div> -->

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
            <th> Date Created:</th>
            <td>{{ object.dateAssigned }}</td>
          </tr>
          <tr>
            <th>For Service Report:</th>
            <td>
              {{ object.serviceReport }}
              <a href="#" target="_blank"><i
                class="fa-solid fa-arrow-right-to-bracket"
                data-toggle="tooltip"
                title="See Details"
              /></a>
            </td>
          </tr>

          <tr>
            <th>Assigned by:</th>
            <td>
              {{ object.assignedBy }}
              <a href="#" target="_blank">
                <i
                  class="fa-solid fa-circle-info"
                  data-toggle="tooltip"
                  title="Contact Info"
                />
              </a>
            </td>
          </tr>
          <tr>
            <th>Assigned to:</th>
            <td>
              {{ object.assignetTo }}
              <!-- {% if object.user %} -->
              <a href="#" target="_blank">
                <i
                  class="fa-solid fa-circle-info"
                  data-toggle="tooltip"
                  title="Contact Info"
                />
              </a>
              <!-- {% endif %} -->
            </td>
          </tr>
          <tr>
            <th>Status:</th>
            <td>{{ object.status }}</td>
          </tr>

          <!-- {% if object.meeting_required %} -->
          <tr>
            <th>Meeting:</th>
            <td>
              {{ object.meeting }}
              <a
                href="#"
                target="_blank"
              >
                <i
                  class="fa-solid fa-arrow-right-to-bracket"
                  data-toggle="tooltip"
                  title="Show Meeting"
                />
              </a>
            </td>
          </tr>
          <!-- {% endif %} -->

          <!-- {% if object.expense_estimate_available %} -->
          <tr>
            <th>Offer:</th>
            <td>
              <a href="#">
                <i
                  class="fa-solid fa-arrow-right-to-bracket"
                  data-toggle="tooltip"
                  title="Show Offer"
                />
              </a>
            </td>
          </tr>
          <!-- {% endif %} -->
          <tr>
            <th>Last Updated:</th>
            <td>{{ object.lastUpdated }}</td>
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
    <!-- more actions -->
    <!-- <div class="form-main form-main--filters">
      <div class="form__foot">
        {% if object.assignment_status != "Done" %}
        {% if request.user == object.user and viewer_group.name == "Contractors" %}
        {% if assignment.assignment_status == "Accepted" and object.expense_estimate_available %}
        <a
          class="btn btn-outline-primary disabled"
          href="{% url 'create meeting' object.pk %}"
        >Create
          a
          Meeting</a>
        <a
          class="btn btn-outline-primary disabled"
          href="{% url 'create expense' object.pk %}"
        >Create
          an
          Offer</a>
        {% elif assignment.assignment_status == "Accepted" %}
        <a class="btn btn-primary" href="{% url 'create meeting' object.pk %}">Create
          a
          Meeting</a>
        <a class="btn btn-primary" href="{% url 'create expense' object.pk %}">Create
          an
          Offer</a>
        {% else %}
        <h2>You can create a Meeting or an Offer once you accept the assignment</h2>
        {% endif %}
        {% endif %}
        {% endif %}
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>

</style>
