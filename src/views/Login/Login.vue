<script>
import { mapActions } from 'pinia';
import LoadSpinner from '../../components/LoadSpinner.vue';
import { loginUser } from '../../dataProviders/auth';
import { useUsersStore } from '../../stores/usersStore';

export default {
  components: { LoadSpinner },
  data() {
    return {
      isLoading: false,
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(useUsersStore, ['storeLoginUser']),
    async handleSubmit() {
      this.isLoading = true;
      const userData = {
        email: this.email,
        password: this.password,
        withCredentials: true,
      };
      const response = await loginUser(userData);
      await this.storeLoginUser(response.user_id);
      this.isLoading = false;
      this.$router.push({ name: 'profile-details', params: { id: response.user_id } });
    },
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Welcome to Maintenance Management</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post" @submit.prevent="handleSubmit">
            <div class="form__fields">
              <label for="email">E-mail</label>
              <input
                id="email"
                v-model="email"
                type="email"
                :disabled="isLoading"
              >
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                :disabled="isLoading"
              >
            </div>
            <div class="form__foot">
              <button class="btn btn-primary">
                <LoadSpinner v-if="isLoading" />
                <span v-else>Login</span>
              </button>

              <a href="{% url 'reset password' %}">Forgotten password</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
