<script>
import { useVuelidate } from '@vuelidate/core';
import { alpha, helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { mapState } from 'pinia';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { useUsersStore } from '../../../stores/usersStore';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { editProfile, getProfileById } from '../../../dataProviders/profile';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { MAX_FILE_SIZE_IN_MB, phoneNumberValidator } from '../../../helpers/formValidators';

export default {
  components: {
    CreateFormFooter,
    LoadSpinner,
    ValidationMessege,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      object: {
        first_name: '',
        last_name: '',
        phone_number: '',
        file: null,
      },
      isLoading: true,
      format: formatImageLink,
      formatShort,
      uploadedImage: false,
      imageType: null,
      imageName: null,
      clearImageChecked: false,
      validationError: false,
      MAX_FILE_SIZE: MAX_FILE_SIZE_IN_MB,
    };
  },
  computed: {
    ...mapState(useUsersStore, ['getCurrentUser']),
  },
  async created() {
    this.object = await getProfileById(this.getCurrentUser.id);
    this.isLoading = false;
  },
  methods: {
    async handleEdit() {
      const isValid = await this.v$.$validate();
      if (isValid) {
        if (this.clearImageChecked)
          this.object.file = null;
        else if (this.uploadedImage)
          this.object.file = this.uploadedImage;
        const profileData = {
          first_name: this.object.first_name,
          last_name: this.object.last_name,
          phone_number: this.object.phone_number,
          file: this.object.file,
          extension: this.imageType,
          filename: this.imageName,
        };
        await editProfile(this.object.user, profileData);

        this.$router.push({ name: 'profile-details', params: { id: this.object.id } });
      }
    },
    handleCheckboxChange() {
      this.clearImageChecked = !this.clearImageChecked;
    },
    handleFileUploaded(event) {
      const file = event.target.files[0];
      this.validateImg(file);
      if (file) {
        this.imageName = file.name.slice(0, file.name.length / 2);
        const reader = new FileReader();
        const extension = file.type.replace('image/', '');
        this.imageType = `.${extension}`;
        reader.onload = () => {
          this.uploadedImage = reader.result.split(',')[1];
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
        first_name: { required, minLength: minLength(2), maxLength: maxLength(30), alpha },
        last_name: { required, minLength: minLength(2), maxLength: maxLength(30), alpha },
        phone_number: { required, maxLength: maxLength(15), phoneNumberValidator: helpers.withMessage('Phone number must be entered in the format: \'+999999999\'. Up to 15 digits allowed.', phoneNumberValidator) },
      },

    };
  },
};
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
                <a :href="format(object.file)" target="_blank">{{ formatShort(object.file) }}</a>
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
              <input
                id="image"
                type="file"
                :disabled="clearImageChecked"
                @change="handleFileUploaded"
              >
            </div>
            <div v-if="validationError" class="error-msg">
              The maximum file size that can be uploaded is{{ MAX_FILE_SIZE }} MB
            </div>
            <template v-if="validationError">
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
