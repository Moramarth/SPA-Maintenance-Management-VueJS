<script setup>
import DeleteView from '../../../components/defaultViews/DeleteView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering';
import { formatDate } from '../../../helpers/formatDate';
</script>

<template>
  <DeleteView
    :object-type="conditionalObjectRendering.typeOfObject.meeting"
  >
    <template #page-header>
      Delete Meeting
    </template>
    <template #info-message="{ ...object }">
      <h2>Are you sure you want to delete your scheduled meeting?</h2>
      <p> {{ formatDate(object.meeting_date) }}</p>
    </template>
  </DeleteView>
</template>

<style  scoped>

</style>
