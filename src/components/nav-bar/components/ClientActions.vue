<script>
export default {

};
</script>

<template>
  <li>
    <router-link class="nav-link" :to="{ name: 'create-service-report' }">
      Create Report
    </router-link>
  </li>
  <li>
    <router-link class="nav-link" :to="{ name: 'show-all-service-reports' }">
      Show My Reports
    </router-link>
  </li>
  <li>
    <hr class="dropdown-divider">
  </li>
  <li><a class="nav-link" href="#">Invite a colleague</a></li>
</template>

<style lang="scss" scoped>

</style>
