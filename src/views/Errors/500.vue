<script>
export default {

};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>500 Internal Server Error</h1>
      </div>
      <div class="section__body">
        <div class="error-image">
          <img src="../../../public/500.jpg" alt="">
          Image by storyset on Freepik
        </div>

        <div class="form-main form-main--filters">
          <div class="form__wrap">
            <div class="form__foot">
              <router-link class="btn btn-dark text-centered" :to="{ name: 'login-page' }">
                BACK TO HOMEPAGE
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
