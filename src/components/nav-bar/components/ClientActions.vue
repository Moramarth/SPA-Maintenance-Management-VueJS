<script setup>
import {createRouteNames, listRouteNames} from "../../../router/routeNames.js";
</script>

<template>
  <li>
    <router-link class="nav-link" :to="{ name: createRouteNames.serviceReport }">
      Create Report
    </router-link>
  </li>
  <li>
    <router-link class="nav-link" :to="{ name: listRouteNames.serviceReport }">
      Show My Reports
    </router-link>
  </li>
  <!-- <li>
    <hr class="dropdown-divider">
  </li> -->
  <!-- not implemented in the backend
  <li><a class="nav-link" href="#">Invite a colleague</a></li> -->
</template>

<style scoped>

</style>
