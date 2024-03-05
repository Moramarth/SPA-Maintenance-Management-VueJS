<script setup>
import DetailsView from '../../../components/defaultViews/DetailsView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering';
import { formatDate } from '../../../helpers/formatDate';
import { detailsRouteNames } from '../../../router/routeNames.js';

const conditions = structuredClone(conditionalObjectRendering);
conditions.representedAs.table = true;
</script>

<template>
  <DetailsView
    :object-type="conditions.typeOfObject.assignment"
    :object-represented-as="conditions.representedAs"
  >
    <template #page-header>
      Assignment Details
    </template>
    <template #back-to-array-btn-text>
      Back To Assignments
    </template>

    <template #table-body="{ ...object }">
      <tr>
        <th>Date Created:</th>
        <td>{{ formatDate(object.date_assigned) }}</td>
      </tr>
      <tr>
        <th>For Service Report:</th>
        <td>{{ object.service_report_title }}</td>
      </tr>
      <tr>
        <th>Assigned by:</th>
        <td>
          {{ object.assigned_by_full_name }}

          <router-link :to="{ name: detailsRouteNames.profile, params: { id: object.assigned_by } }">
            <i
              class="fa-solid fa-circle-info"
              data-toggle="tooltip"
              title="Contact Info"
            />
          </router-link>
        </td>
      </tr>
      <tr>
        <th>Assigned to:</th>
        <td>
          {{ object.assigned_to_full_name }}
          <router-link :to="{ name: detailsRouteNames.profile, params: { id: object.user } }">
            <i
              class="fa-solid fa-circle-info"
              data-toggle="tooltip"
              title="Contact Info"
            />
          </router-link>
        </td>
      </tr>
      <tr>
        <th>Status:</th>
        <td>{{ object.assignment_status }}</td>
      </tr>
      <tr v-if="object.meeting_required">
        <th>Meeting:</th>
        <td>
          <router-link :to="{ name: detailsRouteNames.meeting, params: { id: object.meeting_id } }">
            <i
              class="fa-solid fa-arrow-right-to-bracket"
              data-toggle="tooltip"
              title="Show Meeting"
            />
          </router-link>
        </td>
      </tr>

      <tr v-if="object.expense_estimate_available">
        <th>Offer:</th>
        <td>
          <router-link :to="{ name: detailsRouteNames.offer, params: { id: object.offer_id } }">
            <i
              class="fa-solid fa-arrow-right-to-bracket"
              data-toggle="tooltip"
              title="Show Offer"
            />
          </router-link>
        </td>
      </tr>
      <tr>
        <th>Last Updated:</th>
        <td>{{ formatDate(object.last_updated) }}</td>
      </tr>
    </template>
  </DetailsView>
</template>

<style scoped>

</style>
