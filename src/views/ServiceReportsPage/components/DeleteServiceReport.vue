<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import DeleteFormFooter from '../../../components/form-footers/DeleteFormFooter.vue';
import { deleteServiceReport, getServiceReportById } from '../../../dataProviders/serviceReports';
import { formatDate } from '../../../helpers/formatDate';

const route = useRoute();
const router = useRouter();
const object = ref({});

onMounted(async () => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'delete-service-report')
        loadObject();
    },

    { immediate: true },
  );
});

async function deleteObject() {
  await deleteServiceReport(object.value.id);
  router.push({ name: 'show-all-service-reports' });
}
async function loadObject() {
  const id = Number(route.params.id);
  const serviceReport = await getServiceReportById(id);
  if (Object.keys(serviceReport).length === 0)
    router.push({ name: 'NotFound' });
  else {
    object.value = serviceReport;
  }
}
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
              <p>{{ object.title }} from {{ formatDate(object.submit_date) }}</p>
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
