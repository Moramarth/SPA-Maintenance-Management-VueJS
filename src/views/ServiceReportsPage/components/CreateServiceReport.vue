<script>
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';

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
    };
  },
  methods: {
    handleCreation() {
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
              <input id="report-title" type="text" required>
              <label for="report-description">Description:</label>
              <textarea id="report-description" type="text" required />
              <label for="report-file">Image:</label>
              <input type="file">
              <label for="report-type">Report Type:</label>
              <select id="report-type">
                <option v-for="type in reportType" :key="type" :value="type">
                  {{ type }}
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
