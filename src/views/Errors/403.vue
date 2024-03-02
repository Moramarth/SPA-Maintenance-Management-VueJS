<script setup>
import {commonRouteNames} from "../../router/routeNames.js";
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>403 Forbidden</h1>
      </div>
      <div class="section__body">
        <div class="error-image">
          <img src="../../../public/403.jpg" alt="">
        </div>

        <div class="form-main form-main--filters">
          <div class="form__wrap">
            <div class="form__foot">
              <router-link class="btn btn-dark text-centered" :to="{ name: commonRouteNames.login }">
                BACK TO HOMEPAGE
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
