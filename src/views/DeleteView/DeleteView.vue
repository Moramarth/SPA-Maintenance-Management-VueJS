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
  props: {
    deleteType: {
      type: String,
      required: true,
    },
    objectID: {
      type: Number,
      required: true,
    },
  },
  emits: ['confirmDelete'],
  data() {
    return {
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
        DeleteReview: { name: 'review-details', params: { id: this.objectID } },
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
        <h1>{{ headingText[deleteType] }}</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post">
            <div class="form__fields">
              <component :is="deleteType" />
            </div>
            <DeleteFormFooter
              :fallback-u-r-l="fallbackURL[deleteType]"
              @confirm-delete="$emit('confirmDelete')"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
