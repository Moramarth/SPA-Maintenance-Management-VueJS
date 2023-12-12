<script>
import { mapState } from 'pinia';
import { useUsersStore } from '../../../stores/usersStore';
import { getReviewById } from '../../../dataProviders/reviews';
import { getCompanyById } from '../../../dataProviders/companies';

export default {
  data() {
    return {
      object: {},
      profile: {},
      company: {},
    };
  },
  computed: {
    ...mapState(useUsersStore, ['authenticationStatus', 'getCurrentUser', 'getStoreProfiles']),
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
    async loadObject() {
      const id = Number(this.$route.params.id);
      const review = await getReviewById(id);
      if (Object.keys(review).length === 0)
        this.$router.push({ name: 'NotFound' });
      else {
        this.object = review;
        if (this.object.user) {
          this.profile = this.getStoreProfiles.filter(profile => profile.user === this.object.user)[0];
          this.company = await getCompanyById(this.profile.company);
        }
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
                v-if="profile.file"
                class="img-fluid rounded-start"
                :src="profile.file"
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
                  <strong>From:</strong> {{ profile.first_name }} {{ profile.last_name }}
                </p>
                <p v-else>
                  <strong>From:</strong> Ex tenant
                </p>

                <p v-if="object.company">
                  <strong>Company:</strong> {{ object.company }}
                </p>

                <p v-else>
                  <strong>Company:</strong> Previous Partner
                </p>

                <p v-if="object.serviceReport">
                  <strong>For:</strong> {{ object.serviceReport }}
                </p>

                <p><strong>Rating:</strong> {{ object.rating }}</p>
                <p><strong>Comment:</strong> {{ object.comment }}</p>
              </div>
            </div>

            <div class="block__logo">
              <img
                v-if="company.file"
                class="img-fluid rounded-start"
                :src="company.file"
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
