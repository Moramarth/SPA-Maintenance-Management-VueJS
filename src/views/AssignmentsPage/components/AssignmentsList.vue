<script setup>
import ListView from '../../../components/defaultViews/ListView.vue';
import { conditionalArrayRendering } from '../../../constants/conditionalRendering';
import { formatDate } from '../../../helpers/formatDate';
import {detailsRouteNames} from "../../../router/routeNames.js";

const numberOfTableColumns = 9;
const searchKeyword = 'name';

const conditions = structuredClone(conditionalArrayRendering);

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
      <td>{{ object.service_report_title }} </td>

      <td>{{ object.assigned_to_full_name }}</td>
      <td>{{ object.assigned_by_full_name }}</td>
      <td>{{ object.assignment_status }}</td>
      <td>{{ object.report_type }}</td>
      <td v-if="object.meeting_required">
        <i class="fa-solid fa-circle-check" />
      </td>
      <td v-else>
        <i class="fa-solid fa-circle-xmark" />
      </td>
      <td v-if="object.expense_estimate_available">
        <i class="fa-solid fa-circle-check" />
      </td>
      <td v-else>
        <i class="fa-solid fa-circle-xmark" />
      </td>
      <td>{{ formatDate(object.last_updated) }}</td>
      <td>
        <router-link class="btn btn-outline-primary" :to="{ name: detailsRouteNames.assignment, params: { id: object.id } }">
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
