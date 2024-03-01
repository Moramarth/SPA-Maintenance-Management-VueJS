<script setup>
import ListView from '../../../components/defaultViews/ListView.vue';
import { conditionalRendering } from '../../../constants/conditionalRendering';
import { formatDate } from '../../../helpers/formatDate';

const conditions = structuredClone(conditionalRendering);
const numberOfTableColumns = 5;

conditions.objectsListedAs.table = true;
</script>

<template>
  <ListView
    :type-of-list="conditions.typeOfList.meetings"
    :objects-listed-as="conditions.objectsListedAs"
    :desired-filters="conditions.desiredFilters"
    :colspan-when-table-is-empty="numberOfTableColumns"
  >
    <template #page-header>
      Meetings
    </template>
    <template #table-headers>
      <th>Created by</th>
      <th>For Assignment</th>
      <th>Description</th>
      <th>Date</th>
      <th>Details</th>
    </template>
    <template #empty-table-message>
      No Meetings to show
    </template>
    <template #object-data-row="{ ...object }">
      <td>{{ object.created_by_full_name }} </td>
      <td>{{ object.assignment_as_string }}</td>
      <td>{{ object.description }}</td>
      <td>{{ formatDate(object.meeting_date) }}</td>
      <td>
        <router-link class="btn btn-outline-primary" :to="{ name: 'meeting-details', params: { id: object.id } }">
          See
          Details
        </router-link>
      </td>
    </template>
  </ListView>
</template>

<style  scoped>

</style>
