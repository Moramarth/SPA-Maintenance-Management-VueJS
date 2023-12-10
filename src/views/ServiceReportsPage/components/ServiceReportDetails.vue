<script>
import { getServiceReportById } from '../../../dataProviders/serviceReports';

export default {
  data() {
    return {
      object: {

      },

    };
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.loadObject();
      },

      { immediate: true },
    );
  },
  methods: {
    async loadObject() {
      const id = this.$route.params.id;
      this.object = await getServiceReportById(id);
      console.log(this.object);
    },
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
              <!-- TODO: clean btn available logic -->
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
                    {{ object.company }}

                    <!-- TODO: if time left make this modal -->
                    <router-link :to="{ name: 'profile-details', params: { id: object.user } }">
                      <i
                        class="fa-solid fa-circle-info"
                        data-toggle="tooltip"
                        title="Contact Info"
                      />
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th>Report Type:</th>
                  <td>{{ object.report_type }}</td>
                </tr>
                <tr>
                  <th>Report Status:</th>
                  <td>{{ object.report_status }}</td>
                </tr>
                <tr v-if="object.file">
                  <th>Image:</th>
                  <td>
                    <a :href="object.file" target="_blank">
                      <i
                        class="fa-regular fa-image"
                        data-toggle="tooltip"
                        title="View Image"
                      />
                    </a>
                  </td>
                </tr>

                <tr v-if="object.assigned_to">
                  <th>Assigned to:</th>
                  <td>
                    {{ object.assigned_to }}
                    Employee at {{ object.assigned_to }}

                    <router-link :to="{ name: 'profile-details', params: { id: object.assigned_to } }">
                      <i
                        class="fa-solid fa-circle-info"
                        data-toggle="tooltip"
                        title="Contact Info"
                      />
                    </router-link>
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
              <router-link v-if="object.report_status === 'Done' && getCurrentUser.id === object.user" class="btn btn-success" :to="{ name: 'create-review' }">
                Create Review
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
