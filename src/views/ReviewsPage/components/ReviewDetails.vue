<script>
import { mapState } from 'pinia';
import { useUsersStore } from '../../../stores/usersStore';
import { getReviewById } from '../../../dataProviders/reviews';

export default {
  data() {
    return {
      object: {},
    };
  },
  computed: {
    ...mapState(useUsersStore, ['authenticationStatus', 'getCurrentUser']),
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.name === 'review-details')
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
      }
    },
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Review Details</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--filters">
          <div v-if="authenticationStatus && (getCurrentUser.id === object.user)" class="form__wrap">
            <div class="form__foot">
              <router-link class="btn btn-warning" :to="{ name: 'edit-review', params: { id: object.id } }">
                Edit
              </router-link>
              <router-link class="btn btn-danger" :to="{ name: 'delete-review', params: { id: object.id } }">
                Delete
              </router-link>
            </div>
          </div>
        </div>

        <div class="section__body-group">
          <div class="block-review">
            <div class="block__image">
              <img
                v-if="object.user_profile_picture"
                class="img-fluid rounded-start"
                :src="object.user_profile_picture"
                alt=""
              >
              <img
                v-else
                class="img-fluid rounded-start"
                src="../../../../public/default_profile_picture.png"
                alt=""
              >
            </div>

            <div class="block__content">
              <div class="block__content-bg">
                <p v-if="object.user">
                  <strong>From:</strong>
                  {{ object.user_full_name }}
                </p>
                <p v-else>
                  <strong>From:</strong> Ex tenant
                </p>

                <p v-if="object.user_company_name">
                  <strong>Company:</strong>
                  {{ object.user_company_name }}
                </p>

                <p v-else>
                  <strong>Company:</strong> Previous Partner
                </p>

                <p v-if="object.service_report">
                  <strong>For:</strong> {{ object.service_report_title }}
                </p>

                <p><strong>Rating:</strong> {{ object.rating }}</p>
                <p><strong>Comment:</strong> {{ object.comment }}</p>
              </div>
            </div>

            <div class="block__logo">
              <img
                v-if="object.company_logo"
                class="img-fluid rounded-start"
                :src="object.company_logo"
                alt=""
              >
              <img
                v-else
                class="img-fluid rounded-start"
                src="../../../../public/default_company_logo.jpg"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
