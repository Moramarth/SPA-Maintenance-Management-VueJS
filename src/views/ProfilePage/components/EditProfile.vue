<script>
import { mapState } from 'pinia';
import CreateFormFooter from '../../../components/form-footers/CreateFormFooter.vue';
import { useUsersStore } from '../../../stores/usersStore';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { editProfile, getProfileById } from '../../../dataProviders/profile';
import { formatImageLink, formatShort } from '../../../helpers/formatImageLink';

export default {
  components: {
    CreateFormFooter,
    LoadSpinner,
  },
  data() {
    return {
      object: {},
      isLoading: true,
      format: formatImageLink,
      formatShort,
    };
  },
  computed: {
    ...mapState(useUsersStore, ['getCurrentUser', 'getStoreProfiles']),
  },
  async created() {
    this.object = await getProfileById(this.getCurrentUser.id);
    this.isLoading = false;
  },
  methods: {
    handleEdit() {
      const profileData = {
        first_name: this.object.first_name,
        last_name: this.object.last_name,
        phone_number: this.object.phone_number,
        withCredentials: true,
      };
      const response = editProfile(this.object.user, profileData);
      console.log(response);
      this.$router.push({ name: 'profile-details', params: { id: this.object.id } });
    },
  },
};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <section v-else class="section">
    <div class="container">
      <div class="section__head">
        <h1>Edit Profile</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post" enctype="multipart/form-data">
            <div class="form__fields">
              <label for="first-name">First Name:</label>
              <input
                id="first-name"
                v-model="object.first_name"
                type="text"
                placeholder="Jhon"
                required
              >
              <label for="last-name">Last Name:</label>
              <input
                id="last-name"
                v-model="object.last_name"
                type="text"
                placeholder="Doe"
                required
              >
              <label for="phone-number">Phone Number:</label>
              <input
                id="phone-number"
                v-model="object.phone_number"
                type="text"
                placeholder="+359123456789"
                required
              >
              <label for="image">Profile Picture:</label>
              <template v-if="object.file">
                Currently:
                <a :href="format(object.file)" target="_blank">{{ formatShort(object.file) }}</a>
                <p>
                  <input id="file-clear" type="checkbox">
                  <label class="clear-image" for="file-clear">Clear Current</label>
                </p>
              </template>
              <input id="image" type="file">
            </div>
            <CreateFormFooter
              :is-editing="true"
              :fallback-u-r-l="{ name: 'profile-details', params: { id: object.id } }"
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
