<script>
export default {

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
          <form action="" method="post">
            <div class="form__fields">
              <label for="email">E-mail</label>
              <input id="email" type="email">
              <label for="password">Password</label>
              <input id="password" type="password">
            </div>
            <div class="form__foot">
              <button class="btn btn-primary">
                Login
              </button>

              <a href="{% url 'reset password' %}">Forgotten password</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
