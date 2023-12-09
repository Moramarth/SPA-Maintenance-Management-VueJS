<script>
export default {
  data() {
    return {
      user: {
        id: -1,
        company: {
          id: -1,
        },
      },
    };
  },
  methods: {
    handleLogout() {
      this.$router.push({ name: 'home-page' });
    },
  },
};
</script>

<template>
  <a
    id="navbarDropdown"
    class="nav-link dropdown-toggle"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    User full name
  </a>
  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <li>
      <!-- profile url -->
      <router-link class="nav-link" :to="{ name: 'profile-details', params: { id: user.id } }">
        Profile
      </router-link>
    </li>
    <li>
      <!-- company details url -->
      <router-link
        class="nav-link"
        :to="{ name: 'company-details', params: { id: user.company.id } }"
      >
        Company
      </router-link>
    </li>
    <li>
      <hr class="dropdown-divider">
    </li>
    <li>
      <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
    </li>
  </ul>
</template>

<style scoped>

</style>
