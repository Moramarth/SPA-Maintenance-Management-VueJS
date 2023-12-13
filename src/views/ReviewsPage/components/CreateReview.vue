<script>
import { mapActions, mapState } from 'pinia';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { useTempObjectStore } from '../../../stores/tempObjectsStore';
import { createReview } from '../../../dataProviders/reviews';
import { useUsersStore } from '../../../stores/usersStore';

// TODO: handle creation only with report presented
export default {
  components: {
    CreateFormFooter,
  },
  data() {
    return {
      serviceReport: {},
      object: {
        comment: '',
      },

      rating: [
        [1, 'Very Bad'],
        [2, 'Bad'],
        [3, 'Good'],
        [4, 'Very good'],
        [5, 'Excellent'],
      ],

    };
  },
  computed: {
    ...mapState(useTempObjectStore, ['getTempObject']),
    ...mapState(useUsersStore, ['getCurrentUser', 'getCurrentToken']),
  },
  methods: {
    ...mapActions(useTempObjectStore, ['clearTempObject']),
    async handleCreation() {
      this.serviceReport = this.getTempObject;
      const reviewData = {
        token: this.getCurrentToken,
        user: this.getCurrentUser.id,
        service_report: this.serviceReport.id,
        rating: 4,
        comment: this.object.comment,
      };
      await createReview(reviewData);
      this.clearTempObject();
      this.$router.push({ name: 'show-all-reviews' });
    },
  },
};
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
                <option v-for="rate in rating" :key="rate" value="rate[0]">
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
