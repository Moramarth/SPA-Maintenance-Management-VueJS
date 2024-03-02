<script setup>
import ListView from '../../../components/defaultViews/ListView.vue';
import { conditionalArrayRendering } from '../../../constants/conditionalRendering';
import CompanyCard from '../../../components/CompanyCard.vue';

const conditions = structuredClone(conditionalArrayRendering);

conditions.objectsListedAs.cards = true;
const searchKeyword = 'name';
conditions.desiredFilters.bySearch = true;
</script>

<template>
  <ListView
    :type-of-list="conditions.typeOfList.companies"
    :objects-listed-as="conditions.objectsListedAs"
    :desired-filters="conditions.desiredFilters"
    :search-keyword-if-applicable="searchKeyword"
  >
    <template #page-header>
      Partners
    </template>
    <template #empty-testimonials-list>
      No Partners to show
    </template>
    <template #card-slot="{ ...object }">
      <CompanyCard :company="object" />
    </template>
  </ListView>
</template>

<style scoped>

</style>
