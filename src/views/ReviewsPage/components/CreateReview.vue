<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { useTempObjectStore } from '../../../stores/tempObjectsStore';
import { createReview } from '../../../dataProviders/reviews';
import ValidationMessege from '../../../components/ValidationMessege.vue';

const router = useRouter();
const tempObjStore = useTempObjectStore();
const serviceReport = ref({});
const object = ref({
  comment: '',
});

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

async function handleCreation() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    serviceReport.value = tempObjStore.getTempObject;
    const reviewData = {
      service_report: serviceReport.value.id,
      rating: Number(document.querySelector('#review-rating').value),
      comment: object.value.comment,
    };
    await createReview(reviewData);
    tempObjStore.clearTempObject();
    router.push({ name: 'show-all-reviews' });
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Create Review</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post" enctype="multipart/form-data">
            <div class="form__fields">
              <label for="review-rating">Rating:</label>
              <select
                id="review-rating"
                required
              >
                <option v-for="rate in rating" :key="rate" :value="rate[0]">
                  {{ rate[1] }}
                </option>
              </select>
              <label for="review-comment">Comment:</label>
              <textarea
                id="review-comment"
                v-model="object.comment"
                type="text"
                required
                placeholder="We are looking forward to your feedback"
              />
              <ValidationMessege :errors="v$.object.comment.$errors" />
            </div>
            <CreateFormFooter
              :is-editing="false"
              :fallback-u-r-l="{ name: 'show-all-reviews' }"
              @is-created="handleCreation"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
