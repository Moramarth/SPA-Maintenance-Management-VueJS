<script setup>
import ListView from '../../../components/defaultViews/ListView.vue';
import Testimonial from '../../../components/Testimonial.vue';
import { conditionalArrayRendering } from '../../../constants/conditionalRendering';

const conditions = structuredClone(conditionalArrayRendering);

conditions.objectsListedAs.testimonials = true;

conditions.desiredFilters.byRating = true;
</script>

<template>
  <ListView
    :type-of-list="conditions.typeOfList.reviews"
    :objects-listed-as="conditions.objectsListedAs"
    :desired-filters="conditions.desiredFilters"
  >
    <template #page-header>
      Reviews
    </template>
    <template #empty-testimonials-list>
      No Reviews to show
    </template>
    <template #card-slot="{ ...object }">
      <Testimonial :testimonial="object" />
    </template>
  </ListView>
</template>

<style  scoped>
</style>
