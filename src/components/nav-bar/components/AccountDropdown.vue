<script>
export default {

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
      <a class="nav-link" href="#">Profile</a>
    </li>
    <li>
      <!-- company details url -->
      <a
        class="nav-link"
        href="#"
      >Company</a>
    </li>
    <li>
      <hr class="dropdown-divider">
    </li>
    <li>
      <a class="nav-link" href="#">Logout</a>
    </li>
  </ul>
</template>

<style scoped>

</style>
