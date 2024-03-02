<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { useTempObjectStore } from '../../../stores/tempObjectsStore';
import { createReview } from '../../../dataProviders/reviews';
import ValidationMessege from '../../../components/ValidationMessege.vue';
import { rating } from '../../../constants/reviewRating';
import {listRouteNames} from "../../../router/routeNames.js";

const router = useRouter();
const tempObjStore = useTempObjectStore();
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

async function handleCreation() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    serviceReport.value = tempObjStore.getTempObject;
    const reviewData = {
      service_report: serviceReport.value.id,
      rating: object.value.rating,
      comment: object.value.comment,
    };
    await createReview(reviewData);
    tempObjStore.clearTempObject();
    router.push({ name: listRouteNames.review });
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
                v-model="object.rating"
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
              :fallback-u-r-l="{ name: listRouteNames.review }"
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
