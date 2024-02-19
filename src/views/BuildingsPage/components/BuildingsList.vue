<script setup>
import ListView from '../../../components/defaultViews/ListView.vue';
import BuildingCard from '../../../components/BuildingCard.vue';
import { conditionalRendering } from '../../../constants/conditionalRendering';

const conditions = structuredClone(conditionalRendering);

conditions.objectsListedAs.cards = true;

conditions.desiredFilters.byBuilding = true;
</script>

<template>
  <ListView
    :type-of-list="conditions.typeOfList.buildings"
    :objects-listed-as="conditions.objectsListedAs"
    :desired-filters="conditions.desiredFilters"
  >
    <template #page-header>
      Buildings
    </template>
    <template #empty-testimonials-list>
      No Buildings to show
    </template>
    <template #card-slot="{ ...object }">
      <BuildingCard :building="object" />
    </template>
  </ListView>
</template>

<style scoped>

</style>
