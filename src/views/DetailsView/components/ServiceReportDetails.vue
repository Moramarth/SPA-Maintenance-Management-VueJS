<script>
export default {
  props: {
    object: {
      type: Object,
      required: false,
      default: () => {
        return {
          user: 'user full name',
          title: 'report title',
          description: 'Some description here',
          meetingDate: 'Meeting date',
          file: '',
          reportStatus: 'status',
          reportType: 'report type',
          companyName: 'company name',
          assignedTo: {
            name: 'Person name',
            companyName: 'Company name assigned to',
          },
          dateAssigned: 'Date assigned',
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
        <!-- {% if request.user == object.user %}
        {% if object.report_status == "Pending" %} -->
        <!-- <a class="btn btn-warning" href="{% url 'edit report' object.pk %}">
          Edit Report
        </a>
        <a class="btn btn-danger" href="{% url 'delete report' object.pk %}">
          Delete Report
        </a>
        {% else %} -->
        <a class="btn btn-warning disabled" href="#">
          Edit Report
        </a>
        <a class="btn btn-danger disabled" href="#">
          Delete Report
        </a>
        <!-- {% endif %}
        {% endif %}
        {% if object.report_status == "Pending" %}
        {% if viewer_group.name == 'Supervisor'%} -->
        <a class="btn btn-success" href="#">
          Assign Report
        </a>
        <a class="btn btn-danger" href="#">
          Reject Report
        </a>

        <!-- {% elif viewer_group.name == 'Engineering' %} -->
        <a class="btn btn-success" href="#">
          Assign Report to Me
        </a>
        <a class="btn btn-success" href="#">
          Assign Report to Contractor
        </a>
        <!-- {% endif %}
        {% elif object.report_status == "Rejected" and viewer_group.name == 'Supervisor'%} -->
        <a class="btn btn-success" href="#">
          Assign Report
        </a>
        <!-- {% endif %} -->

        <a class="btn btn-primary" href="#">
          View Service Reports
        </a>
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
            <th>Subject:</th>
            <td>{{ object.title }}</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{{ object.description }}</td>
          </tr>
          <tr>
            <th>From:</th>
            <td>
              {{ object.user }}
              Employee at
              {{ object.companyName }}
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
            <th>Report Type:</th>
            <td>{{ object.reportType }}</td>
          </tr>
          <tr>
            <th>Report Status:</th>
            <td>{{ object.reportStatus }}</td>
          </tr>
          <tr v-if="object.file">
            <th>Image:</th>
            <td>
              <a href="#" target="_blank">
                <i
                  class="fa-regular fa-image"
                  data-toggle="tooltip"
                  title="View Image"
                />
              </a>
            </td>
          </tr>
          <!-- {% endif %}
          {% if object.assigned_to %} -->
          <tr>
            <th>Assigned to:</th>
            <td>
              {{ object.assignedTo.name }}
              Employee at {{ object.assignedTo.companyName }}

              <a href="{% url 'profile details' object.assigned_to.pk %}" target="_blank">

                <i
                  class="fa-solid fa-circle-info"
                  data-toggle="tooltip"
                  title="Contact Info"
                />
              </a>
            </td>
          </tr>

          <tr>
            <th>Related Assignment</th>
            <td>
              {{ object.dateAssigned }}
              <a
                href="# "
                target="_blank"
              >
                <i
                  class="fa-solid fa-arrow-right-to-bracket"
                  data-toggle="tooltip"
                  title="See Details"
                />
              </a>
            </td>
          </tr>
          <!-- {% endif %} -->
        </tbody>
        <thead>
          <tr class="table table-light">
            <th />
            <th />
          </tr>
        </thead>
      </table>
    </div>

    <div class="form-main form-main--filters">
      <div class="form__foot">
        <!-- {% if object.report_status == "Done" and request.user == object.user %} -->
        <a class="btn btn-success" href="#">Create Review</a>
        <!-- {% endif %} -->
      </div>
    </div>
  </div>
  <!-- {% endblock %} -->
</template>

<style lang="scss" scoped>

</style>
