<script>
import DeleteFormFooter from '../../../components/form-footers/DeleteFormFooter.vue';

export default {
  components: {
    DeleteFormFooter,
  },
  data() {
    return {
      object: {},
    };
  },
  methods: {
    deleteObject() {
      this.$router.push({ name: 'show-all-service-reports' });
    },
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Delete Service Report</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post">
            <div class="form__fields">
              <h2>Are you sure you want to delete your service report?</h2>
              <p>{{ object.title }} from {{ object.submitDate }}</p>
            </div>
            <DeleteFormFooter
              :fallback-u-r-l="{ name: 'service-report-details', params: { id: object.id } }"
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
