<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editCompany, getCompanyById } from '../../../dataProviders/companies';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { MAX_FILE_SIZE_IN_MB } from '../../../helpers/formValidators';

const route = useRoute();
const router = useRouter();

const object = ref({
  name: '',
  business_field: '',
  additional_information: '',
  file: '',
});

const isLoading = ref(true);
const imageName = ref(null);
const imageType = ref(null);
const uploadedImage = ref(false);
const clearImageChecked = ref(false);
const validationError = ref(false);
const rules = {
  object: {
    name: { required, maxLength: maxLength(150) },
    business_field: { maxLength: maxLength(250) },
    additional_information: { maxLength: maxLength(500) },
  },
};

const v$ = useVuelidate(rules, { object });
onMounted (async () => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'edit-company')
        loadObject();
    },

    { immediate: true },
  );
});

async function handleEdit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    if (clearImageChecked.value)
      object.value.file = null; else if (uploadedImage.value)
      object.value.file = uploadedImage.value;
    const companyData = {
      name: object.value.name,
      business_field: object.value.business_field,
      additional_information: object.value.additional_information,
      file: object.value.file,
      extension: imageType.value,
      filename: imageName.value,
    };
    await editCompany(object.value.id, companyData);
    router.push({ name: 'company-details', params: { id: object.value.id } });
  }
}

async function loadObject() {
  const id = route.params.id;
  object.value = await getCompanyById(id);
  isLoading.value = false;
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
                    :disabled="uploadedImage"
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
                :disabled="clearImageChecked"
                @change="handleFileUploaded"
              >

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
