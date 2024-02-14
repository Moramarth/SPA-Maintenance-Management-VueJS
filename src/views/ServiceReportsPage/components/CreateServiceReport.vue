<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MAX_FILE_SIZE_IN_MB } from '../../../helpers/formValidators';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { createServiceReport } from '../../../dataProviders/serviceReports';
import { reportType } from '../../../constants/reportType';

const router = useRouter();
const object = ref({
  title: '',
  description: '',
  file: null,
  report_type: '',
  imageType: 'null',
  imageName: 'null',
});
const validationError = ref(false);
const isLoading = ref(false);
const rules = {
  object: {
    title: { required, maxLength: maxLength(50) },
    description: { required, maxLength: maxLength(500) },
  },
};
const v$ = useVuelidate(rules, { object });

async function handleCreation() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    isLoading.value = true;
    const reportData = {
      title: object.value.title,
      description: object.value.description,
      file: object.value.file,
      extension: object.value.imageType,
      filename: object.value.imageName,
      report_type: document.querySelector('#report-type').value,
    };
    await createServiceReport(reportData);
    isLoading.value = false;
    router.push({ name: 'show-all-service-reports' });
  }
}
function handleFileUploaded(event) {
  const file = event.target.files[0];
  validateImg(file);
  if (file) {
    object.value.imageName = file.name.slice(0, file.name.length / 2);
    const reader = new FileReader();
    const extension = file.type.replace('image/', '');
    object.value.imageType = `.${extension}`;
    reader.onload = () => {
      object.value.file = reader.result.split(',')[1];
    };
    reader.readAsDataURL(file);
  }
}
function validateImg(file) {
  if (file.size > MAX_FILE_SIZE_IN_MB * 1024 * 1024)
    validationError.value = true;
  else
    validationError.value = false;
}
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
                placeholder="Short Descriptive title"
                :disabled="isLoading"
              >
              <ValidationMessege :errors="v$.object.title.$errors" />

              <label for="report-description">Description:</label>
              <textarea
                id="report-description"
                v-model="object.description"
                type="text"
                required
                placeholder="Provide detailed information about the problem you are facing"
                :disabled="isLoading"
              />
              <ValidationMessege :errors="v$.object.description.$errors" />

              <label for="report-file">Image:</label>
              <input type="file" :disabled="isLoading" @change="handleFileUploaded">

              <div v-if="validationError" class="error-msg">
                The maximum file size that can be uploaded is {{ MAX_FILE_SIZE_IN_MB }}MB
              </div>

              <label for="report-type">Report Type:</label>
              <select id="report-type" required :disabled="isLoading">
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
              :fallback-u-r-l="{ name: 'login-page' }"
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
