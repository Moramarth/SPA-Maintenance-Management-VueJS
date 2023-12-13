<script>
import LoadSpinner from '../../../components/LoadSpinner.vue';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editCompany, getCompanyById } from '../../../dataProviders/companies';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';

export default {
  components: {
    CreateFormFooter,
    LoadSpinner,
  },
  data() {
    return {
      object: {},
      isLoading: true,
      format: formatImageLink,
      formatShort,
      imageName: null,
      imageType: null,
      uploadedImage: false,
      clearImageChecked: false,
    };
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.name === 'edit-company')
          this.loadObject();
      },

      { immediate: true },
    );
  },
  methods: {
    async handleEdit() {
      if (this.clearImageChecked)
        this.object.file = null;
      else if (this.uploadedImage)
        this.object.file = this.uploadedImage;
      const companyData = {
        name: this.object.name,
        business_field: this.object.business_field,
        additional_information: this.object.additional_information,
        file: this.object.file,
        extension: this.imageType,
        filename: this.imageName,
      };
      await editCompany(this.object.id, companyData);
      this.$router.push({ name: 'company-details', params: { id: this.object.id } });
    },
    async loadObject() {
      const id = this.$route.params.id;
      this.object = await getCompanyById(id);
      this.isLoading = false;
    },
    handleCheckboxChange() {
      this.clearImageChecked = !this.clearImageChecked;
    },
    handleFileUploaded(event) {
      const file = event.target.files[0];
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
  },
};
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
              <label for="business-field">Business Field:</label>
              <input id="business-field" v-model="object.business_field" type="text">
              <label for="more-info">Additional Information:</label>
              <textarea id="more-info" v-model="object.additional_information" />
              <label for="logo">Company Logo</label>
              <template v-if="object.file">
                Currently:
                <a :href="format(object.file)" target="_blank">{{ formatShort(object.file) }}</a>
                <p>
                  <input id="file-clear" type="checkbox">
                  <label
                    class="clear-image"
                    for="file-clear"
                    :disabled="uploadedImage"
                    @change="handleCheckboxChange"
                  >Clear Current</label>
                </p>
              </template>
              <input
                id="logo"
                type="file"
                :disabled="clearImageChecked"
                @change="handleFileUploaded"
              >
            </div>
            <CreateFormFooter
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

<style lang="scss" scoped>

</style>
