<script>
import CreateServiceReport from './components/CreateServiceReport.vue';
import CreateFormFooter from './components/CreateFormFooter.vue';
import CreateReview from './components/CreateReview.vue';

export default {
  components: {
    CreateServiceReport,
    CreateFormFooter,
    CreateReview,
  },
  data() {
    return {
      createObject: 'CreateReview',
      isEditing: true,
    };
  },
  computed: {
    headingText() {
      const headingText = {
        EditAssignment: 'Edit Assignment',
        EditCompany: 'Edit Company Information',
        CreateMeeting: this.isEditing ? 'Edit Meeting' : 'Create meeting',
        CrateOffer: this.isEditing ? 'Edit Offer' : 'Create Offer',
        CreateReview: this.isEditing ? 'Edit Review' : 'Create Review',
        CreateServiceReport: this.isEditing ? 'Edit Report' : 'Create Report',
      };
      return headingText[this.createObject];
    },
    fallbackURL() {
      const urlMap = {
        EditAssignment: this.isEditing ? '#edit' : '#',
        EditCompany: this.isEditing ? '#edit' : '#',
        CreateMeeting: this.isEditing ? '#edit' : '#',
        CrateOffer: this.isEditing ? '#edit' : '#',
        CreateReview: this.isEditing ? '#edit' : '#',
        CreateServiceReport: this.isEditing ? '#edit' : '#',
      };
      return urlMap[this.createObject];
    },
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>{{ headingText }}</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post" enctype="multipart/form-data">
            <div class="form__fields">
              <component :is="createObject" :is-editing="isEditing" />
            </div>
            <CreateFormFooter :is-editing="isEditing" :fallback-u-r-l="fallbackURL" />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
