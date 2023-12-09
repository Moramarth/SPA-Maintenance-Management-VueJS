<script>
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';

// TODO: handle creation only with report presented
export default {
  components: {
    CreateFormFooter,
  },
  data() {
    return {
      serviceReport: {
        id: -1,
        title: 'title',
      },
    };
  },
  methods: {
    handleCreation() {
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
              <p v-if="serviceReport">
                Your Review for {{ serviceReport.title }}
              </p>
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
              <textarea id="review-comment" type="text" required />
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
