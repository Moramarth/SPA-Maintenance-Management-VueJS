<script setup>
import ListView from '../../../components/defaultViews/ListView.vue';
import { conditionalRendering } from '../../../constants/conditionalRendering';

const conditions = structuredClone(conditionalRendering);
const numberOfTableColumns = 5;

conditions.objectsListedAs.table = true;
</script>

<template>
  <ListView
    :type-of-list="conditions.typeOfList.offers"
    :objects-listed-as="conditions.objectsListedAs"
    :desired-filters="conditions.desiredFilters"
    :colspan-when-table-is-empty="numberOfTableColumns"
  >
    <template #page-header>
      Offers
    </template>
    <template #table-headers>
      <th>Title</th>
      <th>Created by</th>
      <th>Additional info</th>
      <th>For Assignment</th>
      <th>Details</th>
    </template>
    <template #empty-table-message>
      No Offers to show
    </template>
    <template #object-data-row="{ ...object }">
      <td>{{ object.title }} </td>
      <td>{{ object.created_by_full_name }} </td>
      <td>{{ object.additional_information }}</td>
      <td>{{ object.assignment_as_string }}</td>
      <td>
        <router-link class="btn btn-outline-primary" :to="{ name: 'offer-details', params: { id: object.id } }">
          See
          Details
        </router-link>
      </td>
    </template>
  </ListView>
</template>

<style scoped>

</style>
