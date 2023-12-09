<script>
export default {
  data() {
    return {
      object: {
        user: 'user full name',
        title: 'report title',
        description: 'Some description here',
        meetingDate: 'Meeting date',
        file: '',
        reportStatus: 'Pending',
        reportType: 'report type',
        companyName: 'company name',
        assignedTo: {
          name: 'Person name',
          companyName: 'Company name assigned to',
        },
        dateAssigned: 'Date assigned',
      },

    };
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Service Report Details</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--filters">
          <div class="form__wrap">
            <div class="form__foot">
              <!-- {% if request.user == object.user %} -->
              <template v-if="object.reportStatus === 'Pending'">
                <router-link class="btn btn-warning" :to="{ name: 'edit-service-report', params: { id: object.id } }">
                  Edit Report
                </router-link>
                <router-link class="btn btn-danger" :to="{ name: 'delete-service-report', params: { id: object.id } }">
                  Delete Report
                </router-link>
              </template>
              <template v-else>
                <router-link class="btn btn-warning disabled" :to="{ name: 'edit-service-report', params: { id: object.id } }">
                  Edit Report
                </router-link>
                <router-link class="btn btn-danger disabled" :to="{ name: 'delete-service-report', params: { id: object.id } }">
                  Delete Report
                </router-link>
              </template>
              <!-- endif -->

              <router-link class="btn btn-primary" :to="{ name: 'show-all-service-reports' }">
                View Service Reports
              </router-link>
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

                <!-- {% if object.assigned_to %}  -->
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
                  <th>Related Assignment: </th>
                  <td>
                    {{ object.dateAssigned }}
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
              <router-link class="btn btn-success" :to="{ name: 'create-review' }">
                Create Review
              </router-link>
              <!-- {% endif %} -->
            </div>
          </div>
        </div>
        <!-- {% endblock %} -->
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
