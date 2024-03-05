<script setup>
import DetailsView from '../../../components/defaultViews/DetailsView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering';
import { deleteRouteNames, detailsRouteNames, editRouteNames } from '../../../router/routeNames';

const conditions = structuredClone(conditionalObjectRendering);
conditions.representedAs.table = true;
</script>

<template>
  <DetailsView
    :object-type="conditions.typeOfObject.offer"
    :object-represented-as="conditions.representedAs"
  >
    <template #page-header>
      Offer Details
    </template>
    <template #user-can-edit-options="{ ...object }">
      <router-link class="btn btn-warning" :to="{ name: editRouteNames.offer, params: { id: object.id } }">
        Edit Meeting
      </router-link>
      <router-link class="btn btn-danger" :to="{ name: deleteRouteNames.offer, params: { id: object.id } }">
        Delete Meeting
      </router-link>
    </template>
    <template #back-to-array-btn-text>
      Back To Offers
    </template>
    <template #table-body="{ ...object }">
      <tr>
        <th>For assignment:</th>
        <td>
          {{ object.assignment_as_string }}
          <router-link :to="{ name: detailsRouteNames.assignment, params: { id: object.assignment } }">
            <i
              class="fa-solid fa-arrow-right-to-bracket"
              data-toggle="tooltip"
              title="Show Assignment"
            />
          </router-link>
        </td>
      </tr>
      <tr>
        <th>Title:</th>
        <td>{{ object.title }}</td>
      </tr>
      <tr>
        <th>More Info:</th>
        <td>
          {{ object.additional_information }}
        </td>
      </tr>

      <tr>
        <th>Created by:</th>
        <td>
          {{ object.created_by_full_name }}
          <router-link :to="{ name: detailsRouteNames.profile, params: { id: object.created_by } }">
            <i
              class="fa-solid fa-circle-info"
              data-toggle="tooltip"
              title="Contact Info"
            />
          </router-link>
        </td>
      </tr>
    </template>
  </DetailsView>
</template>

<style scoped>

</style>
