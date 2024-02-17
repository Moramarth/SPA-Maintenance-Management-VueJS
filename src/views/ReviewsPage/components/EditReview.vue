<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editReview } from '../../../dataProviders/reviews';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { singleObjectIsValid } from '../../../helpers/loadSingleObject';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import { rating } from '../../../constants/reviewRating';

const route = useRoute();
const router = useRouter();

const serviceReport = ref({});

const object = ref({
  rating: 0,
  comment: '',
});
const rules = {
  object: {
    rating: { required },
    comment: { maxLength: maxLength(500) },
  },
};
const v$ = useVuelidate(rules, { object });

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'edit-review')
        object.value = await dataObjectMapping.review(route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: 'NotFound' });
      const reportId = object.value.service_report ?? null;
      if (reportId)
        serviceReport.value = await dataObjectMapping.serviceReport(reportId);
    },

    { immediate: true },
  );
});

async function handleEdit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const reviewData = {
      rating: object.value.rating,
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
                v-model="object.rating"
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

<style scoped>

</style>
