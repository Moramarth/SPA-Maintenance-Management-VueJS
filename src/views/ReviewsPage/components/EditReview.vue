<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength } from '@vuelidate/validators';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editReview, getReviewById } from '../../../dataProviders/reviews';
import { getServiceReportById } from '../../../dataProviders/serviceReports';
import ValidationMessege from '../../../components/ValidationMessege.vue';

const route = useRoute();
const router = useRouter();
const object = ref({
  comment: '',
});
const serviceReport = ref({});
const rating = [
  [1, 'Very Bad'],
  [2, 'Bad'],
  [3, 'Good'],
  [4, 'Very good'],
  [5, 'Excellent'],
];

const rules = {
  object: {
    comment: { maxLength: maxLength(500) },

  },
};

const v$ = useVuelidate(rules, { object });

onMounted(async () => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'edit-review')
        loadObject();
    },

    { immediate: true },
  );
});

async function loadObject() {
  const id = Number(route.params.id);
  const review = await getReviewById(id);
  if (Object.keys(review).length === 0)
    router.push({ name: 'NotFound' });
  else {
    object.value = review;
    const reportId = object.value.service_report ?? null;
    if (reportId)
      serviceReport.value = await getServiceReportById(reportId);
  }
}
async function handleEdit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const reviewData = {
      rating: Number(document.querySelector('#review-rating').value),
      comment: object.value.comment,
    };
    await editReview(object.value.id, reviewData);
    router.push({ name: 'review-details', params: { id: object.value.id } });
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Edit Review</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post" enctype="multipart/form-data">
            <div class="form__fields">
              <p v-if="object.service_report">
                Your Review for {{ serviceReport.title }}
              </p>
              <label for="review-rating">Rating:</label>
              <select
                id="review-rating"
                required
              >
                <option
                  v-for="rate in rating"
                  :key="rate"
                  :value="rate[0]"
                  :selected="object.rating === rate[0]"
                >
                  {{ rate[1] }}
                </option>
              </select>
              <label for="review-comment">Comment:</label>
              <textarea
                id="review-comment"
                v-model="object.comment"
                type="text"
                required
              />
              <ValidationMessege :errors="v$.object.comment.$errors" />
            </div>
            <CreateFormFooter
              :is-editing="true"
              :fallback-u-r-l="{ name: 'review-details', params: { id: object.id } }"
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
