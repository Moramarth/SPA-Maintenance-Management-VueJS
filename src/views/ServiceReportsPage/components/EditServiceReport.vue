<script>
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editServiceReport, getServiceReportById } from '../../../dataProviders/serviceReports';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';

export default {
  components: {
    CreateFormFooter,
  },
  data() {
    return {
      object: {
        title: '',
        description: '',
      },
      formatImageLink,
      formatShort,
    };
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.name === 'edit-service-report')
          this.loadObject();
      },

      { immediate: true },
    );
  },
  methods: {
    async loadObject() {
      const id = Number(this.$route.params.id);
      const serviceReport = await getServiceReportById(id);
      if (Object.keys(serviceReport).length === 0)
        this.$router.push({ name: 'NotFound' });
      else {
        this.object = serviceReport;
      }
    },
    async handleEdit() {
      const reportData = {
        title: this.object.title,
        description: this.object.description,
      };
      await editServiceReport(this.object.id, reportData);
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
                v-model="object.title"
                type="text"
                required
              >
              <label for="report-description">Description:</label>
              <textarea
                id="report-description"
                v-model="object.description"
                type="text"
                required
              />
              <label for="report-file">Image:</label>
              <template v-if="object.file">
                Currently:
                <a :href="formatImageLink(object.file)">{{ formatShort(object.file) }}</a>
                <p>
                  <input id="file-clear" type="checkbox">
                  <label class="clear-image" for="file-clear">Clear Current</label>
                </p>
              </template>
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
