<script setup>
import DeleteView from '../../../components/defaultViews/DeleteView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering';
</script>

<template>
  <DeleteView
    :object-type="conditionalObjectRendering.typeOfObject.review"
  >
    <template #page-header>
      Delete Review
    </template>
    <template #info-message="{ ...object }">
      <h2>Are you sure you want to delete your Review?</h2>
      <p>Report: {{ object.service_report_title }}</p>
      <p>Rated: {{ object.rating }}</p>
      <p>Your comment: {{ object.comment }}</p>
    </template>
  </DeleteView>
</template>

<style scoped>

</style>
