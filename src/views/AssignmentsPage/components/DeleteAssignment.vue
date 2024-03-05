<script setup>
import DeleteView from '../../../components/defaultViews/DeleteView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering';

console.log(conditionalObjectRendering.typeOfObject.assignment);
</script>

<template>
  <DeleteView
    :object-type="conditionalObjectRendering.typeOfObject.assignment"
  >
    <template #page-header>
      Delete Assignment
    </template>
    <template #info-message="{ ...object }">
      <h2>Are you sure you want to delete this Assignment?</h2>
      <p> {{ object.service_report_title }} assigned to {{ object.assigned_to_full_name }}</p>
    </template>
  </DeleteView>
</template>

<style  scoped>

</style>
