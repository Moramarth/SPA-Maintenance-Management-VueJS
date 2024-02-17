<script setup>
import { useVuelidate } from '@vuelidate/core';
import { alpha, helpers, maxLength, minLength, required } from '@vuelidate/validators';

import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { useUsersStore } from '../../../stores/usersStore';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { editProfile } from '../../../dataProviders/profile';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { MAX_FILE_SIZE_IN_MB, phoneNumberValidator } from '../../../helpers/formValidators';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import { imageHandler, manageFile } from '../../../helpers/manageFile';

const userStore = useUsersStore();
const router = useRouter();

const object = ref({
  first_name: '',
  last_name: '',
  phone_number: '',
  file: null,
});
const rules = {
  object: {
    first_name: { required, minLength: minLength(2), maxLength: maxLength(30), alpha },
    last_name: { required, minLength: minLength(2), maxLength: maxLength(30), alpha },
    phone_number: { required, maxLength: maxLength(15), phoneNumberValidator: helpers.withMessage('Phone number must be entered in the format: \'+999999999\'. Up to 15 digits allowed.', phoneNumberValidator) },
  },
};
const v$ = useVuelidate(rules, { object });

const isLoading = ref(true);
const currentImageState = reactive(imageHandler);

onMounted(async () => {
  object.value = await dataObjectMapping.profile(userStore.getCurrentUser.id);
  isLoading.value = false;
});

async function handleEdit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    if (currentImageState.clearImageIsChecked)
      object.value.file = null;
    else if (currentImageState.uploadedImage)
      object.value.file = currentImageState.uploadedImage;
    const profileData = {
      first_name: object.value.first_name,
      last_name: object.value.last_name,
      phone_number: object.value.phone_number,
      file: object.value.file,
      extension: currentImageState.imageType,
      filename: currentImageState.imageName,
    };
    await editProfile(object.value.user, profileData);

    router.push({ name: 'profile-details', params: { id: object.value.id } });
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
        <h1>Edit Profile</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post" enctype="multipart/form-data">
            <div class="form__fields">
              <label for="first-name">First Name:</label>
              <input
                id="first-name"
                v-model="object.first_name"
                type="text"
                placeholder="Jhon"
                required
              >
              <ValidationMessege :errors="v$.object.first_name.$errors" />

              <label for="last-name">Last Name:</label>
              <input
                id="last-name"
                v-model="object.last_name"
                type="text"
                placeholder="Doe"
                required
              >
              <ValidationMessege :errors="v$.object.last_name.$errors" />

              <label for="phone-number">Phone Number:</label>
              <input
                id="phone-number"
                v-model="object.phone_number"
                type="text"
                placeholder="+359123456789"
                required
              >
              <ValidationMessege :errors="v$.object.phone_number.$errors" />

              <label for="image">Profile Picture:</label>
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
                  <label class="clear-image" for="file-clear">Clear Current</label>
                </p>
              </template>
              <input
                id="image"
                type="file"
                :disabled="currentImageState.clearImageIsChecked"
                @change="handleFileUploaded"
              >
            </div>
            <div v-if="currentImageState.hasValidationError" class="error-msg">
              The maximum file size that can be uploaded is {{ MAX_FILE_SIZE_IN_MB }}MB
            </div>
            <template v-if="currentImageState.hasValidationError">
              Please upload a new image
            </template>
            <CreateFormFooter
              v-else
              :is-editing="true"
              :fallback-u-r-l="{ name: 'profile-details', params: { id: object.id } }"
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
