<script>
import { mapState } from 'pinia';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { getCompanyById } from '../../../dataProviders/companies';
import { useUsersStore } from '../../../stores/usersStore';

export default {
  components: {
    LoadSpinner,
  },
  props: {
    profileObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      company: {},
      isLoading: true,
    };
  },
  computed: {
    ...mapState(useUsersStore, ['getCurrentUser', 'getStoreProfiles']),
    profileCompany() {
      return this.getStoreProfiles.filter(profile => profile.user === this.getCurrentUser?.id)[0]?.company;
    },
  },
  async created() {
    this.company = await getCompanyById(this.profileObject.company);
    this.isLoading = false;
  },
};
</script>

<template>
  <LoadSpinner v-if="isLoading" />

  <div v-else class="block-testimonial">
    <div class="block__image">
      <img v-if="company.file" :src="company.file" alt="Company Logo">

      <img v-else src="../../../../public/default_company_logo.jpg" alt="">
    </div>
    <div class="block__content">
      <h1>
        {{ company.name }}
        <router-link :to="{ name: 'company-details', params: { id: company.id } }">
          <i
            class="fa-solid fa-arrow-right-to-bracket"
            data-toggle="tooltip"
            title="See Details"
          />
        </router-link>
      </h1>
      <div class="form-main form-main--filters">
        <div v-if="company.business_field" class="form__label">
          <label>Business Field:</label>
          {{ company.business_field }}
        </div>
        <div v-if="profileCompany === company.id" class="form__label">
          <router-link
            class="btn btn-danger"
            :to="{ name: 'edit-company', params: { id: company.id } }"
          >
            Edit
            Company
            Info
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
