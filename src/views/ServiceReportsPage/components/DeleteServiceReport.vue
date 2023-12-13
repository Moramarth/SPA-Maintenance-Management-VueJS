<script>
import DeleteFormFooter from '../../../components/form-footers/DeleteFormFooter.vue';
import { deleteServiceReport, getServiceReportById } from '../../../dataProviders/serviceReports';
import { formatDate } from '../../../helpers/formatDate';

export default {
  components: {
    DeleteFormFooter,
  },
  data() {
    return {
      object: {},
      format: formatDate,
    };
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.name === 'delete-service-report')
          this.loadObject();
      },

      { immediate: true },
    );
  },
  methods: {
    async deleteObject() {
      await deleteServiceReport(this.object.id);
      this.$router.push({ name: 'show-all-service-reports' });
    },
    async loadObject() {
      const id = Number(this.$route.params.id);
      const serviceReport = await getServiceReportById(id);
      if (Object.keys(serviceReport).length === 0)
        this.$router.push({ name: 'NotFound' });
      else {
        this.object = serviceReport;
      }
    },
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Delete Service Report</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post">
            <div class="form__fields">
              <h2>Are you sure you want to delete your service report?</h2>
              <p>{{ object.title }} from {{ format(object.submit_date) }}</p>
            </div>
            <DeleteFormFooter
              :fallback-u-r-l="{ name: 'service-report-details', params: { id: object.id } }"
              @confirm-delete="deleteObject"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
