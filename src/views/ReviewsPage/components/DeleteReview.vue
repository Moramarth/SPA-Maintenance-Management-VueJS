<script>
import DeleteFormFooter from '../../../components/form-footers/DeleteFormFooter.vue';
import { deleteReview, getReviewById } from '../../../dataProviders/reviews';
import { getServiceReportById } from '../../../dataProviders/serviceReports';

export default {
  components: {
    DeleteFormFooter,
  },
  data() {
    return {
      object: {},
      serviceReport: {},
    };
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.loadObject();
      },

      { immediate: true },
    );
  },
  methods: {
    async deleteObject() {
      await deleteReview(this.object.id);
      this.$router.push({ name: 'show-all-reviews' });
    },
    async loadObject() {
      const id = Number(this.$route.params.id);
      const review = await getReviewById(id);
      if (Object.keys(review).length === 0)
        this.$router.push({ name: 'NotFound' });
      else {
        this.object = review;
        this.serviceReport = await getServiceReportById(this.object.service_report);
      }
    },
  },
};
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
