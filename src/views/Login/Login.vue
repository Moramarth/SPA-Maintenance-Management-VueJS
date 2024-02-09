<script setup>
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadSpinner from '../../components/LoadSpinner.vue';
import { loginUser } from '../../dataProviders/auth';
import { useUsersStore } from '../../stores/usersStore';
import ValidationMessege from '../../components/ValidationMessege.vue';

const userStore = useUsersStore();
const router = useRouter();

const isLoading = ref(false);
const errorLogin = ref(false);

const emailInput = ref('');
const password = ref('');

const rules = computed(() => ({
  emailInput: { required, email },
  password: { required },
}
));
const v$ = useVuelidate(rules, { emailInput, password });

async function handleSubmit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    isLoading.value = true;
    const userData = {
      email: emailInput.value,
      password: password.value,
    };
    const response = await loginUser(userData);
    if (Object.keys(response).length === 0) {
      errorLogin.value = true;
      setTimeout(() => {
        errorLogin.value = false;
      }, 2000);
      isLoading.value = false;
      return;
    }
    await userStore.storeLoginUser(response.refresh, response.access);
    isLoading.value = false;
    if (userStore.authenticationStatus)
      router.push({ name: 'profile-details', params: { id: userStore.getCurrentUser.id } });
  }
}
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
                v-model="emailInput"
                type="email"
                :disabled="isLoading"
                placeholder="email@example.com"
              >
              <ValidationMessege :errors="v$.emailInput.$errors" />
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
