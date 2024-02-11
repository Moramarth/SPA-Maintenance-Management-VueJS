<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editServiceReport, getServiceReportById } from '../../../dataProviders/serviceReports';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';
import { MAX_FILE_SIZE_IN_MB } from '../../../helpers/formValidators';

const route = useRoute();
const router = useRouter();
const object = ref({
  title: '',
  description: '',
  file: null,
});
const uploadedImage = ref(false);
const imageType = ref(null);
const imageName = ref(null);
const clearImageChecked = ref(false);
const validationError = ref(false);
const rules = {
  object: {
    title: { required, maxLength: maxLength(50) },
    description: { required, maxLength: maxLength(500) },
  },
};
const v$ = useVuelidate(rules, { object });

onMounted(async () => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'edit-service-report')
        loadObject();
    },

    { immediate: true },
  );
});

async function loadObject() {
  const id = Number(route.params.id);
  const serviceReport = await getServiceReportById(id);
  if (Object.keys(serviceReport).length === 0)
    router.push({ name: 'NotFound' });
  else {
    object.value = serviceReport;
  }
}
async function handleEdit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    if (clearImageChecked.value)
      object.value.file = null;
    else if (uploadedImage.value)
      object.value.file = uploadedImage.value;
    const reportData = {
      title: object.value.title,
      description: object.value.description,
      file: object.value.file,
      extension: imageType.value,
      filename: imageName.value,

    };
    await editServiceReport(object.value.id, reportData);
    router.push({ name: 'service-report-details', params: { id: object.value.id } });
  }
}
function handleCheckboxChange() {
  clearImageChecked.value = !clearImageChecked.value;
}
function handleFileUploaded(event) {
  const file = event.target.files[0];
  validateImg(file);
  if (file) {
    imageName.value = file.name.slice(0, file.name.length / 2);
    const reader = new FileReader();
    const extension = file.type.replace('image/', '');
    imageType.value = `.${extension}`;
    reader.onload = () => {
      uploadedImage.value = reader.result.split(',')[1];
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
        <h1>Edit Service Report</h1>
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
              <template v-if="object.file">
                Currently:
                <a :href="formatImageLink(object.file)">{{ formatShort(object.file) }}</a>
                <p>
                  <input
                    id="file-clear"
                    type="checkbox"
                    :disabled="uploadedImage"
                    @change="handleCheckboxChange"
                  >
                  <label class="clear-image" for="file-clear">Clear Current</label>
                </p>
              </template>
              <input type="file" :disabled="clearImageChecked" @change="handleFileUploaded">

              <div v-if="validationError" class="error-msg">
                The maximum file size that can be uploaded is{{ MAX_FILE_SIZE_IN_MB }} MB
              </div>
            </div>
            <template v-if="validationError">
              Please upload a new image
            </template>
            <CreateFormFooter
              v-else
              :is-editing="true"
              :fallback-u-r-l="{ name: 'service-report-details', params: { id: object.id } }"
              @is-edited="handleEdit"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error-msg {
  color: red;
}
</style>
