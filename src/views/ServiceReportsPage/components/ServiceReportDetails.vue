<script>
import { mapActions, mapState } from 'pinia';
import { getServiceReportById } from '../../../dataProviders/serviceReports';
import { useUsersStore } from '../../../stores/usersStore';
import { getCompanyById } from '../../../dataProviders/companies';
import { useTempObjectStore } from '../../../stores/tempObjectsStore';

export default {
  data() {
    return {
      object: {},
      userProfile: {},
      userCompany: {},
      assignedProfile: {},
      assignedCompany: {},

    };
  },
  computed: {
    ...mapState(useUsersStore, ['getCurrentUser', 'getStoreProfiles']),
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.name === 'service-report-details')
          this.loadObject();
      },

      { immediate: true },
    );
  },
  methods: {
    ...mapActions(useTempObjectStore, ['setTempObject']),
    async loadObject() {
      const id = this.$route.params.id;
      this.object = await getServiceReportById(id);
      if (Object.keys(this.object).lenght !== 0) {
        this.userProfile = this.getStoreProfiles.filter(profile => profile.user === this.object.user)[0];
        this.userCompany = await getCompanyById(this.userProfile.company);
        this.assignedProfile = this.getStoreProfiles.filter(profile => profile.user === this.object.assigned_to)[0];
        if (this.assignedProfile)
          this.assignedCompany = await getCompanyById(this.assignedProfile.company);
      }
    },
    async handleReviewCreation() {
      await this.setTempObject(this.object.id);
      this.$router.push({ name: 'create-review' });
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
              <template v-if="getCurrentUser.id === object.user">
                <template v-if="object.report_status === 'Pending'">
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
              </template>
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
                    {{ userProfile.first_name }} {{ userProfile.last_name }}
                    Employee at
                    {{ userCompany.name }}

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
                    {{ assignedProfile.first_name }} {{ assignedProfile.last_name }}
                    Employee at {{ assignedCompany.name }}

                    <router-link :to="{ name: 'profile-details', params: { id: object.assigned_to } }">
                      <i
                        class="fa-solid fa-circle-info"
                        data-toggle="tooltip"
                        title="Contact Info"
                      />
                    </router-link>
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

          <div class="form-main form-main--filters">
            <div class="form__foot">
              <button v-if="object.report_status === 'Done' && getCurrentUser.id === object.user" class="btn btn-success" @click.prevent="handleReviewCreation">
                Create Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
