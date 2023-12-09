<script>
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';

export default {
  components: {
    CreateFormFooter,
  },
  data() {
    return {
      object: {
        id: -1,
        name: 'company name',
        businessField: 'Product company',
        additionalInformation: 'More info about the company',
        file: '',
      },
    };
  },
  methods: {
    handleEdit() {
      this.$router.push({ name: 'company-details', params: { id: this.object.id } });
    },
  },
};
</script>

<template>
  <section class="section">
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
                type="text"
                :value="object.name"
                required
              >
              <label for="business-field">Business Field:</label>
              <input id="business-field" type="text" :value="object.businessField">
              <label for="more-info">Additional Information:</label>
              <textarea id="more-info" :value="object.additionalInformation" />
              <label for="logo">Company Logo</label>
              <template v-if="object.file">
                Currently:
                <a href="#">{{ object.file }}</a>
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
