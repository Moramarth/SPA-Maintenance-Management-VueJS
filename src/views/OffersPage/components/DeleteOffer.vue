<script setup>
import DeleteView from '../../../components/defaultViews/DeleteView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering';
</script>

<template>
  <DeleteView
    :object-type="conditionalObjectRendering.offer"
  >
    <template #page-header>
      Delete Offer
    </template>
    <template #info-message="{ ...object }">
      <h2>Are you sure you want to delete your offer?</h2>
      <p>{{ object.title }}</p>
    </template>
  </DeleteView>
</template>

<style scoped>

</style>
