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
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
    };
  },
  methods: {
    handleEdit() {
      this.$router.push({ name: 'profile-details', params: { id: this.object.id } });
    },
  },
};
</script>

<template>
  <section class="section">
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
                type="text"
                :value="object.firstName"
                placeholder="Jhon"
                required
              >
              <label for="last-name">Last Name:</label>
              <input
                id="last-name"
                type="text"
                :value="object.lastName"
                placeholder="Doe"
                required
              >
              <label for="phone-number">Phone Number:</label>
              <input
                id="phone-number"
                type="text"
                :value="object.phoneNumber"
                placeholder="+359123456789"
                required
              >
              <label for="image">Profile Picture:</label>
              <template v-if="object.file">
                Currently:
                <a href="#">{{ object.file }}</a>
                <p>
                  <input id="file-clear" type="checkbox">
                  <label class="clear-image" for="file-clear">Clear Current</label>
                </p>
              </template>
              <input id="limage" type="file">
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
