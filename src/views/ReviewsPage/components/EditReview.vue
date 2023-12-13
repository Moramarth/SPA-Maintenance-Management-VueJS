<script>
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { editReview, getReviewById } from '../../../dataProviders/reviews';
import { getServiceReportById } from '../../../dataProviders/serviceReports';

export default {
  components: {
    CreateFormFooter,
  },
  data() {
    return {
      object: {},
      serviceReport: {},
      rating: [
        [1, 'Very Bad'],
        [2, 'Bad'],
        [3, 'Good'],
        [4, 'Very good'],
        [5, 'Excellent'],
      ],
    };
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.name === 'edit-review')
          this.loadObject();
      },

      { immediate: true },
    );
  },
  methods: {
    async loadObject() {
      const id = Number(this.$route.params.id);
      const review = await getReviewById(id);
      if (Object.keys(review).length === 0)
        this.$router.push({ name: 'NotFound' });
      else {
        this.object = review;
        const reportId = this.object.service_report ?? null;
        if (reportId)
          this.serviceReport = await getServiceReportById(reportId);
      }
    },
    async handleEdit() {
      const reviewData = {
        rating: Number(document.querySelector('#review-rating').value),
        comment: this.object.comment,
      };
      await editReview(this.object.id, reviewData);
      this.$router.push({ name: 'review-details', params: { id: this.object.id } });
    },
  },
};
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
