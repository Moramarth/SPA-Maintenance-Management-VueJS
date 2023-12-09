<script>
import DeleteFormFooter from '../../../components/form-footers/DeleteFormFooter.vue';

export default {
  components: {
    DeleteFormFooter,
  },
  data() {
    return {
      object: { id: -1 },
    };
  },
  methods: {
    deleteObject() {
      this.$router.push({ name: 'show-all-reviews' });
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
              <p>Report: {{ object.serviceReport }}</p>
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
