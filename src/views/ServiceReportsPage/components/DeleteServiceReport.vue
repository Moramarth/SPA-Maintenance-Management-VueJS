<script setup>
import DeleteView from '../../../components/defaultViews/DeleteView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering';
import { formatDate } from '../../../helpers/formatDate';
</script>

<template>
  <DeleteView
    :object-type="conditionalObjectRendering.typeOfObject.serviceReport"
  >
    <template #page-header>
      Delete Service Report
    </template>
    <template #info-message="{ ...object }">
      <h2>Are you sure you want to delete your service report?</h2>
      <p>{{ object.title }} from {{ formatDate(object.submit_date) }}</p>
    </template>
  </DeleteView>
</template>

<style scoped>

</style>
