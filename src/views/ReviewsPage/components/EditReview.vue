<script>
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';

export default {
  components: {
    CreateFormFooter,
  },
  data() {
    return {
      object: {
        id: -1,
        comment: 'Some comment here',
        rating: 2,
        serviceReport: {
          id: -1,
          title: 'title',
        },
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
  methods: {
    handleEdit() {
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
              <p v-if="object.serviceReport">
                Your Review for {{ object.serviceReport.title }}
              </p>
              <label for="review-rating">Rating:</label>
              <select
                id="review-rating"
                required
              >
                <option
                  v-for="rate in rating"
                  :key="rate"
                  value="rate[0]"
                  :selected="object.rating === rate[0]"
                >
                  {{ rate[1] }}
                </option>
              </select>
              <label for="review-comment">Comment:</label>
              <textarea
                id="review-comment"
                type="text"
                required
                :value="object.comment"
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
