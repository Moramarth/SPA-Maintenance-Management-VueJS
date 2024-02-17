<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editCompany } from '../../../dataProviders/companies';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { MAX_FILE_SIZE_IN_MB } from '../../../helpers/formValidators';
import { singleObjectIsValid } from '../../../helpers/loadSingleObject';
import { imageHandler } from '../../../constants/imageStateHandler';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import { manageFile } from '../../../helpers/manageFile';

const route = useRoute();
const router = useRouter();

const object = ref({
  name: '',
  business_field: '',
  additional_information: '',
  file: null,
});
const rules = {
  object: {
    name: { required, maxLength: maxLength(150) },
    business_field: { maxLength: maxLength(250) },
    additional_information: { maxLength: maxLength(500) },
  },
};
const v$ = useVuelidate(rules, { object });

const isLoading = ref(true);
const currentImageState = reactive(imageHandler);

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'edit-company')
        object.value = await dataObjectMapping.company(route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: 'NotFound' });
      isLoading.value = false;
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
    const companyData = {
      name: object.value.name,
      business_field: object.value.business_field,
      additional_information: object.value.additional_information,
      file: object.value.file,
      extension: currentImageState.imageType,
      filename: currentImageState.imageName,
    };
    await editCompany(object.value.id, companyData);
    router.push({ name: 'company-details', params: { id: object.value.id } });
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
  <LoadSpinner v-if="isLoading" />
  <section v-else class="section">
    <div class="container">
      <div class="section__head">
        <h1>Edit Company</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post" enctype="multipart/form-data">
            <div class="form__fields">
              <label for="name">Name:</label>
              <input
                id="name"
                v-model="object.name"
                type="text"
                required
              >
              <ValidationMessege :errors="v$.object.name.$errors" />

              <label for="business-field">Business Field:</label>
              <input id="business-field" v-model="object.business_field" type="text">
              <ValidationMessege :errors="v$.object.business_field.$errors" />

              <label for="more-info">Additional Information:</label>
              <textarea id="more-info" v-model="object.additional_information" />
              <ValidationMessege :errors="v$.object.additional_information.$errors" />

              <label for="logo">Company Logo</label>
              <template v-if="object.file">
                Currently:
                <a :href="formatImageLink(object.file)" target="_blank">{{ formatShort(object.file) }}</a>
                <p>
                  <input
                    id="file-clear"
                    type="checkbox"
                    :disabled="currentImageState.uploadedImage"
                    @change="handleCheckboxChange"
                  >
                  <label
                    class="clear-image"
                    for="file-clear"
                  >Clear Current</label>
                </p>
              </template>
              <input
                id="logo"
                type="file"
                :disabled="currentImageState.clearImageIsChecked"
                @change="handleFileUploaded"
              >

              <div v-if="currentImageState.hasValidationError" class="error-msg">
                The maximum file size that can be uploaded is{{ MAX_FILE_SIZE_IN_MB }} MB
              </div>
            </div>
            <template v-if="currentImageState.hasValidationError">
              Please upload a new image
            </template>
            <CreateFormFooter
              v-else
              :is-editing="true"
              :fallback-u-r-l="{ name: 'company-details', params: { id: object.id } }"
              @is-edited="handleEdit"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style  scoped>
.error-msg {
  color: red
}
</style>
