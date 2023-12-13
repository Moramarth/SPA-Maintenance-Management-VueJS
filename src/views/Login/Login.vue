<script>
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { mapActions, mapState } from 'pinia';
import LoadSpinner from '../../components/LoadSpinner.vue';
import { loginUser } from '../../dataProviders/auth';
import { useUsersStore } from '../../stores/usersStore';
import ValidationMessege from '../../components/ValidationMessege.vue';

export default {
  components: {
    LoadSpinner,
    ValidationMessege,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isLoading: false,
      email: '',
      password: '',
      errorLogin: false,
    };
  },
  computed: {
    ...mapState(useUsersStore, ['authenticationStatus']),
  },
  methods: {
    ...mapActions(useUsersStore, ['storeLoginUser']),
    async handleSubmit() {
      const isValid = await this.v$.$validate();
      if (isValid) {
        this.isLoading = true;
        const userData = {
          email: this.email,
          password: this.password,
        };
        const response = await loginUser(userData);

        if (Object.keys(response).length === 0) {
          this.errorLogin = true;
          setTimeout(() => {
            this.errorLogin = false;
          }, 2000);
          this.isLoading = false;
          return;
        }

        await this.storeLoginUser(response.user_id, response.jwt);
        this.isLoading = false;
        if (this.authenticationStatus !== null)
          this.$router.push({ name: 'profile-details', params: { id: response.user_id } });
      }
    },
  },
  validations() {
    return {

      email: { required, email },
      password: { required },

    };
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
                placeholder="email@example.com"
              >
              <ValidationMessege :errors="v$.email.$errors" />
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                :disabled="isLoading"
                placeholder="password"
              >
              <ValidationMessege :errors="v$.password.$errors" />
            </div>
            <div class="form__foot">
              <div v-if="errorLogin" class="error-msg">
                Invalid Email or Password! Access denied!
              </div>
              <button v-else class="btn btn-primary">
                <LoadSpinner v-if="isLoading" />
                <span v-else>Login</span>
              </button>
              <!-- not implemented in backend api
              <a href="{% url 'reset password' %}">Forgotten password</a> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style  scoped>
.error-msg {
  color: red
}
</style>
