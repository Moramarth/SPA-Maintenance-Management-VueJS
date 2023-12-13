<script>
import { mapState } from 'pinia';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { useUsersStore } from '../../../stores/usersStore';
import { createServiceReport } from '../../../dataProviders/serviceReports';

export default {
  components: {
    CreateFormFooter,
  },
  data() {
    return {
      reportType: [
        'Other',
        'Networking',
        'Electrical',
        'Plumbing',
        'Structural Integrity',
        'Security Systems',
        'Landscaping',
      ],
      object: {
        title: '',
        description: '',
        file: null,
        report_type: '',
      },
    };
  },
  computed: {
    ...mapState(useUsersStore, ['getCurrentToken', 'getCurrentUser']),
  },
  methods: {
    async  handleCreation() {
      const reportData = {
        token: this.getCurrentToken,
        user: this.getCurrentUser.id,
        title: this.object.title,
        description: this.object.description,
        file: this.object.file,
        report_type: document.querySelector('#report-type').value,
      };
      await createServiceReport(reportData);
      this.$router.push({ name: 'show-all-service-reports' });
    },
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Create Service Report</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post" enctype="multipart/form-data">
            <div class="form__fields">
              <label for="report-title">Title:</label>
              <input
                id="report-title"
                v-model="object.title"
                type="text"
                required
              >
              <label for="report-description">Description:</label>
              <textarea
                id="report-description"
                v-model="object.description"
                type="text"
                required
              />
              <label for="report-file">Image:</label>
              <input type="file">
              <label for="report-type">Report Type:</label>
              <select id="report-type">
                <option v-for="option in reportType" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <CreateFormFooter
              :is-editing="false"
              :fallback-u-r-l="{ name: 'home-page' }"
              @is-created="handleCreation"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
