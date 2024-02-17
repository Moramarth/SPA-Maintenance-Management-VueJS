<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editServiceReport } from '../../../dataProviders/serviceReports';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';
import { MAX_FILE_SIZE_IN_MB } from '../../../helpers/formValidators';
import { singleObjectIsValid } from '../../../helpers/loadSingleObject';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import { imageHandler } from '../../../constants/imageStateHandler';
import { manageFile } from '../../../helpers/manageFile';

const route = useRoute();
const router = useRouter();

const object = ref({
  title: '',
  description: '',
  file: null,
});
const rules = {
  object: {
    title: { required, maxLength: maxLength(50) },
    description: { required, maxLength: maxLength(500) },
  },
};
const v$ = useVuelidate(rules, { object });
const currentImageState = reactive(imageHandler);

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'edit-report-details')
        object.value = await dataObjectMapping.serviceReport(route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: 'NotFound' });
    },

    { immediate: true },
  );
});

async function handleEdit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    if (currentImageState.clearImageIsChecked)
      object.value.file = null;
    else if (currentImageState.uploadedImage)
      object.value.file = currentImageState.uploadedImage;
    const reportData = {
      title: object.value.title,
      description: object.value.description,
      file: object.value.file,
      extension: currentImageState.imageType,
      filename: currentImageState.imageName,
    };
    await editServiceReport(object.value.id, reportData);
    router.push({ name: 'service-report-details', params: { id: object.value.id } });
  }
}
function handleCheckboxChange() {
  currentImageState.clearImageIsChecked = !currentImageState.clearImageIsChecked;
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
                    :disabled="currentImageState.uploadedImage"
                    @change="handleCheckboxChange"
                  >
                  <label class="clear-image" for="file-clear">Clear Current</label>
                </p>
              </template>
              <input type="file" :disabled="currentImageState.clearImageIsChecked" @change="handleFileUploaded">

              <div v-if="currentImageState.hasValidationError" class="error-msg">
                The maximum file size that can be uploaded is {{ MAX_FILE_SIZE_IN_MB }}MB
              </div>
            </div>
            <template v-if="currentImageState.hasValidationError">
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
