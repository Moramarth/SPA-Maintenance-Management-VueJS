<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import DeleteFormFooter from '../../../components/form-footers/DeleteFormFooter.vue';
import { deleteReview } from '../../../dataProviders/reviews';
import { loadSingleObject, singleObjectIsValid } from '../../../helpers/loadSingleObject';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';

const route = useRoute();
const router = useRouter();

const object = ref({});
const serviceReport = ref({});

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'delete-review')
        object.value = await loadSingleObject(route.params.id, 'review');
      if (!singleObjectIsValid(object.value))
        router.push({ name: 'NotFound' });
      const reportId = object.value.service_report ?? null;
      if (reportId)
        serviceReport.value = await dataObjectMapping.serviceReport(reportId);
    },

    { immediate: true },
  );
});

async function deleteObject() {
  await deleteReview(object.value.id);
  router.push({ name: 'show-all-reviews' });
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Delete Review</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post">
            <div class="form__fields">
              <h2>Are you sure you want to delete your Review?</h2>
              <p>Report: {{ serviceReport.title }}</p>
              <p>Rated: {{ object.rating }}</p>
              <p>Your comment: {{ object.comment }}</p>
            </div>
            <DeleteFormFooter
              :fallback-u-r-l="{ name: 'review-details', params: { id: object.id } }"
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
