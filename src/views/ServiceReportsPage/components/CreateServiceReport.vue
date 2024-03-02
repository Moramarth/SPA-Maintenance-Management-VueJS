<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MAX_FILE_SIZE_IN_MB } from '../../../helpers/formValidators';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { createServiceReport } from '../../../dataProviders/serviceReports';
import { reportType } from '../../../constants/reportType';
import { imageHandler } from '../../../constants/imageStateHandler';
import { manageFile } from '../../../helpers/manageFile';
import {commonRouteNames, listRouteNames} from "../../../router/routeNames.js";

const router = useRouter();

const object = ref({
  title: '',
  description: '',
  report_type: '',
});
const rules = {
  object: {
    title: { required, maxLength: maxLength(50) },
    description: { required, maxLength: maxLength(500) },
    report_type: { required },
  },
};
const v$ = useVuelidate(rules, { object });

const currentImageState = reactive(imageHandler);
const isLoading = ref(false);

async function handleCreation() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    isLoading.value = true;
    const reportData = {
      title: object.value.title,
      description: object.value.description,
      file: currentImageState.uploadedImage ? currentImageState.uploadedImage : null,
      extension: currentImageState.imageType,
      filename: currentImageState.imageName,
      report_type: object.value.report_type,
    };
    await createServiceReport(reportData);
    isLoading.value = false;
    router.push({ name: listRouteNames.serviceReport });
  }
}
function handleFileUploaded(event) {
  const file = event.target.files[0];
  manageFile(file, currentImageState);
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
              <select
                id="report-type"
                v-model="object.report_type"
                required
                :disabled="isLoading"
              >
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
              :fallback-u-r-l="{ name: commonRouteNames.login }"
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
