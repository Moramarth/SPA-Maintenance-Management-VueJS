<script setup>
import ListView from '../../../components/defaultViews/ListView.vue';
import { conditionalRendering } from '../../../constants/conditionalRendering';

const numberOfTableColumns = 8;
const searchKeyword = 'name';

const conditions = structuredClone(conditionalRendering);

conditions.objectsListedAs.table = true;

// conditions.desiredFilters.byAssignmentStatus = true;
// conditions.desiredFilters.byMeetingRequired = true;
// conditions.desiredFilters.byExpenseEstimateAvailable = true;
conditions.desiredFilters.byReportType = true;
conditions.desiredFilters.bySearch = true;
</script>

<template>
  <ListView
    :type-of-list="conditions.typeOfList.assignments"
    :objects-listed-as="conditions.objectsListedAs"
    :desired-filters="conditions.desiredFilters"
    :search-keyword-if-applicable="searchKeyword"
    :colspan-when-table-is-empty="numberOfTableColumns"
  >
    <template #page-header>
      Assignments
    </template>

    <template #table-headers>
      <th>Service Report</th>
      <th>Assigned to</th>
      <th>Assigned by</th>
      <th>Status</th>
      <th>Report Type</th>
      <th>Meeting</th>
      <th>Offer</th>
      <th>Last Updated</th>
      <th>Details</th>
    </template>

    <template #object-data-row="{ ...object }">
      <td>{{ object.service_report }} </td>

      <td>{{ object.assigned_to_full_name }}</td>
      <td>{{ object.assigned_by_full_name }}</td>
      <td>{{ object.status }}</td>
      <td>{{ object.report_type }}</td>
      <td>{{ object.meeting }}</td>
      <td>{{ object.offer }}</td>
      <td>{{ formatDate(object.last_updated) }}</td>
      <td>
        <router-link class="btn btn-outline-primary" :to="{ name: 'assignment-details', params: { id: object.id } }">
          See
          Details
        </router-link>
      </td>
    </template>

    <template #empty-table-message>
      No Assignments to show
    </template>
  </ListView>
</template>

<style scoped>

</style>
