<script>
import AccountDropdown from './components/AccountDropdown.vue';
import ClientActions from './components/ClientActions.vue';

export default {
  components: {
    AccountDropdown,
    ClientActions,
  },
  data() {
    return {
      isAuthenticated: true,
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <button
      class="navbar-toggler collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <ul class="navbar-nav">
        <template v-if="isAuthenticated">
          <li class="nav-item dropdown">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <ClientActions />
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="nav-link" href="#">Show Buildings</a></li>
              <li><a class="nav-link" href="#">Show Partners</a></li>
              <li><a class="nav-link" href="#">Show Reviews</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <AccountDropdown />
          </li>
        </template>

        <template v-else>
          <li>
            <router-link class="nav-link" :to="{ name: 'login-page' }">
              Login
            </router-link>
          </li>
          <li>
            <router-link
              class="nav-link"
              :to="{ name: 'register-info-page' }"
            >
              Registration
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>
