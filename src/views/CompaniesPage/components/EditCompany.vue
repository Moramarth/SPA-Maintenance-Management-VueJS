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
    handleEdit() {
      const companyData = {
        name: this.object.name,
        business_field: this.object.business_field,
        additional_information: this.object.additional_information,
        withCredentials: true,
      };
      const response = editCompany(this.object.id, companyData);
      console.log(response);
      this.$router.push({ name: 'company-details', params: { id: this.object.id } });
    },
    async loadObject() {
      const id = this.$route.params.id;
      this.object = await getCompanyById(id);
      this.isLoading = false;
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
                  <label class="clear-image" for="file-clear">Clear Current</label>
                </p>
              </template>
              <input id="logo" type="file">
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
