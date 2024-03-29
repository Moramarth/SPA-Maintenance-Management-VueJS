<script setup>
import { useRouter } from 'vue-router';
import ListView from '../../../components/defaultViews/ListView.vue';
import { conditionalArrayRendering } from '../../../constants/conditionalRendering';
import { useUsersStore } from '../../../stores/usersStore';
import { formatDate } from '../../../helpers/formatDate';
import {detailsRouteNames, otherRouteNames} from "../../../router/routeNames.js";

const userStore = useUsersStore();
const router = useRouter();
const numberOfTableColumns = 8;
const searchKeyword = 'title';

const conditions = structuredClone(conditionalArrayRendering);

conditions.objectsListedAs.table = true;

conditions.desiredFilters.byReportStatus = true;
conditions.desiredFilters.byReportType = true;
conditions.desiredFilters.bySearch = true;

function autoAssignReports() {
  router.push({ name: otherRouteNames.autoAssignStatus });
}
</script>

<template>
  <ListView
    :type-of-list="conditions.typeOfList.serviceReports"
    :objects-listed-as="conditions.objectsListedAs"
    :desired-filters="conditions.desiredFilters"
    :search-keyword-if-applicable="searchKeyword"
    :colspan-when-table-is-empty="numberOfTableColumns"
  >
    <template #page-header>
      Service Reports
    </template>
    <template #extra-functionality>
      <button class="btn btn-outline-danger" @click="autoAssignReports">
        Auto assign reports
      </button>
    </template>
    <template #table-headers>
      <th>Title</th>
      <th>Created by</th>
      <th>Company</th>
      <th>Report Status</th>
      <th>Report Type</th>
      <th>Submit Date</th>
      <th>Assigned to</th>
      <th>Details</th>
    </template>
    <template #empty-table-message>
      No Service Reports to show
    </template>
    <template #object-data-row="{ ...object }">
      <td>{{ object.title }} </td>
      <td v-if="userStore.getCurrentUser && (userStore.getCurrentUser.id === object.user)">
        You
      </td>
      <td v-else>
        {{ object.user_full_name }}
      </td>
      <td>{{ object.user_company_name }}</td>
      <td>{{ object.report_status }}</td>
      <td>{{ object.report_type }}</td>
      <td>{{ formatDate(object.submit_date) }}</td>

      <td v-if="!object.assigned_to">
        None
      </td>
      <td v-else>
        {{ object.assigned_to_full_name }}
      </td>

      <td>
        <router-link class="btn btn-outline-primary" :to="{ name: detailsRouteNames.serviceReport, params: { id: object.id } }">
          See
          Details
        </router-link>
      </td>
    </template>
  </ListView>
</template>

<style scoped>
</style>
