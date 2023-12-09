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
        title: 'Service report title',
        description: 'Service report description',
        file: 'Service report attachments if any',
      },
    };
  },
  methods: {
    handleEdit() {
      this.$router.push({ name: 'service-report-details', params: { id: this.object.id } });
    },
  },
};
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
                type="text"
                :value="object.title"
                required
              >
              <label for="report-description">Description:</label>
              <textarea
                id="report-description"
                type="text"
                :value="object.description"
                required
              />
              <label for="report-file">Image:</label>
              Currently:
              <a href="#">{{ object.file }}</a>
              <p>
                <input id="file-clear" type="checkbox">
                <label class="clear-image" for="file-clear">Clear Current</label>
              </p>
              <input type="file">
            </div>
            <CreateFormFooter
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

</style>
