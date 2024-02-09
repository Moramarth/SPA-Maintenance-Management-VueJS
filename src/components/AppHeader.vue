<script setup>
import Navigation from './nav-bar/Navigation.vue';
</script>

<template>
  <header class="header fixed-top bg-light">
    <div class="container">
      <router-link class="logo" :to="{ name: 'login-page' }">
        <img
          src="../../public/navbar_logo.png"
          alt="logo"
          width=""
          height=""
          class="d-inline-block align-text-top"
        >

        <span>Maintenance Management</span>
      </router-link>

      <Navigation />
    </div>
  </header>
</template>

<style scoped>
.header {
    width: 100%;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.4);
    padding: 1.2rem 0;
}

.header .container {
    display: flex;
    align-items: center;
}

.header .logo {
    margin-right: auto;
}

.header .navbar {
    text-align: right;
}

.logo {
    font-size: 0;
    line-height: 0;
    display: flex;
    align-items: center;
    gap: 1.0rem;
    text-decoration: none;
    color: #000;
}

.logo img {
    width: 6.0rem;
    height: 6.0rem;
    object-fit: contain;
    object-position: center center;

}

.logo span {
    font-size: 1.6rem;
    line-height: 1.10;
    font-weight: 700;
}

@media (max-width: 991.98px) {
    .header .navbar-collapse {
        padding: 2.0rem var(--bs-gutter-x, .75rem);
        position: fixed;
        left: 0;
        right: 0;
        top: 8.5rem;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: white;
    }
}

@media (max-width: 767.98px) {
    .header + * {
        padding-top: 6.5rem;
    }
}
</style>
