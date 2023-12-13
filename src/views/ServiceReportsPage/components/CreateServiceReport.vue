<script>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { mapState } from 'pinia';
import { MAX_FILE_SIZE_IN_MB } from '../../../helpers/formValidators';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { useUsersStore } from '../../../stores/usersStore';
import { createServiceReport } from '../../../dataProviders/serviceReports';

;

export default {
  components: {
    CreateFormFooter,
    ValidationMessege,
  },
  setup() {
    return { v$: useVuelidate() };
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
        imageType: 'null',
        imageName: 'null',
      },
      validationError: false,
      MAX_FILE_SIZE: MAX_FILE_SIZE_IN_MB,

    };
  },
  computed: {
    ...mapState(useUsersStore, ['getCurrentToken', 'getCurrentUser']),
  },
  methods: {
    async  handleCreation() {
      const isValid = await this.v$.$validate();
      if (isValid) {
        const reportData = {
          token: this.getCurrentToken,
          user: this.getCurrentUser.id,
          title: this.object.title,
          description: this.object.description,
          file: this.object.file,
          extension: this.object.imageType,
          filename: this.object.imageName,
          report_type: document.querySelector('#report-type').value,
        };
        await createServiceReport(reportData);
        this.$router.push({ name: 'show-all-service-reports' });
      }
    },
    handleFileUploaded(event) {
      const file = event.target.files[0];
      this.validateImg(file);
      if (file) {
        this.object.imageName = file.name.slice(0, file.name.length / 2);
        const reader = new FileReader();
        const extension = file.type.replace('image/', '');
        this.object.imageType = `.${extension}`;
        reader.onload = () => {
          this.object.file = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);
      }
    },
    validateImg(file) {
      if (file.size > this.MAX_FILE_SIZE * 1024 * 1024)
        this.validationError = true;
      else
        this.validationError = false;
    },
  },
  validations() {
    return {
      object: {
        title: { required, maxLength: maxLength(50) },
        description: { required, maxLength: maxLength(500) },
      },

    };
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
              <ValidationMessege :errors="v$.object.title.$errors" />

              <label for="report-description">Description:</label>
              <textarea
                id="report-description"
                v-model="object.description"
                type="text"
                required
              />
              <ValidationMessege :errors="v$.object.description.$errors" />

              <label for="report-file">Image:</label>
              <input type="file" @change="handleFileUploaded">

              <div v-if="validationError" class="error-msg">
                The maximum file size that can be uploaded is{{ MAX_FILE_SIZE }} MB
              </div>

              <label for="report-type">Report Type:</label>
              <select id="report-type" required>
                <option v-for="option in reportType" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <template v-if="validationError">
              Please upload a new image
            </template>
            <CreateFormFooter
              v-else
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
.error-msg {
  color: red
}
</style>
