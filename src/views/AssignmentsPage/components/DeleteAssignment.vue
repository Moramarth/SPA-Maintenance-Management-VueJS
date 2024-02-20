<script setup>
import DeleteFormFooter from '../../../components/form-footers/DeleteFormFooter.vue';
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Delete Assignment</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--login">
          <form action="" method="post">
            <div class="form__fields">
              <h2>Are you sure you want to delete this Assignment?</h2>
              <p> {{ object.service_report }} assigned to {{ object.user }}</p>
            </div>
            <DeleteFormFooter
              :fallback-u-r-l="{ name: 'assignment-details', params: { id: object.id } }"
              @confirm-delete="deleteObject"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style  scoped>

</style>
