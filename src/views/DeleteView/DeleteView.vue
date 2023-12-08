<script>
import DeleteFormFooter from './components/DeleteFormFooter.vue';
import DeleteReview from './components/DeleteReview.vue';
import DeleteServiceReport from './components/DeleteServiceReport.vue';

export default {
  components: {
    DeleteFormFooter,
    DeleteReview,
    DeleteServiceReport,
  },
  data() {
    return {
      deleteObject: 'DeleteServiceReport',
      headingText: {
        DeleteAssignment: 'Delete Assignment',
        DeleteMeeting: 'Delete Meeting',
        DeleteOffer: 'Delete Offer',
        DeleteReview: 'Delete Review',
        DeleteServiceReport: 'Delete Report',
      },
      fallbackURL: {
        DeleteAssignment: '#',
        DeleteMeeting: '#',
        DeleteOffer: '#',
        DeleteReview: '#',
        DeleteServiceReport: '#',
      },
    };
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>{{ headingText[deleteObject] }}</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post">
            <div class="form__fields">
              <component :is="deleteObject" />
            </div>
            <DeleteFormFooter :fallback-u-r-l="fallbackURL[deleteObject]" />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
