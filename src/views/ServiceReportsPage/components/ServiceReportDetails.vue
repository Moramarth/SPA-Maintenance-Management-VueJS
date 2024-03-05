<script setup>
import { useRouter } from 'vue-router';
import DetailsView from '../../../components/defaultViews/DetailsView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering';
import { useTempObjectStore } from '../../../stores/tempObjectsStore';
import { formatDate } from '../../../helpers/formatDate';
import { createRouteNames, deleteRouteNames, detailsRouteNames, editRouteNames } from '../../../router/routeNames.js';
import { useUsersStore } from '../../../stores/usersStore.js';

const router = useRouter();
const userStore = useUsersStore();
const tempObjStore = useTempObjectStore();
const conditions = structuredClone(conditionalObjectRendering);
conditions.representedAs.table = true;

async function handleReviewCreation(object) {
  await tempObjStore.setTempObject(object.id);
  router.push({ name: createRouteNames.review });
}
</script>

<template>
  <DetailsView
    :object-type="conditions.typeOfObject.serviceReport"
    :object-represented-as="conditions.representedAs"
  >
    <template #page-header>
      Service Report Details
    </template>
    <template #user-can-edit-options="{ ...object }">
      <template v-if="object.report_status === 'Pending'">
        <router-link class="btn btn-warning" :to="{ name: editRouteNames.serviceReport, params: { id: object.id } }">
          Edit Report
        </router-link>
        <router-link class="btn btn-danger" :to="{ name: deleteRouteNames.serviceReport, params: { id: object.id } }">
          Delete Report
        </router-link>
      </template>
      <template v-else>
        <router-link class="btn btn-warning disabled" :to="{ name: editRouteNames.serviceReport, params: { id: object.id } }">
          Edit Report
        </router-link>
        <router-link class="btn btn-danger disabled" :to="{ name: deleteRouteNames.serviceReport, params: { id: object.id } }">
          Delete Report
        </router-link>
      </template>
    </template>
    <template #back-to-array-btn-text>
      View Service Reports
    </template>
    <template #table-body="{ ...object }">
      <tr>
        <th>Subject:</th>
        <td>{{ object.title }}</td>
      </tr>
      <tr>
        <th>Description:</th>
        <td>{{ object.description }}</td>
      </tr>
      <tr>
        <th>From:</th>
        <td>
          {{ object.user_full_name }}
          Employee at
          {{ object.user_company_name }}

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
        <th>Report Type:</th>
        <td>{{ object.report_type }}</td>
      </tr>
      <tr>
        <th>Report Status:</th>
        <td>{{ object.report_status }}</td>
      </tr>
      <tr v-if="object.file">
        <th>Image:</th>
        <td>
          <a :href="object.file" target="_blank">
            <i
              class="fa-regular fa-image"
              data-toggle="tooltip"
              title="View Image"
            />
          </a>
        </td>
      </tr>

      <tr v-if="object.assigned_to">
        <th>Assigned to:</th>
        <td>
          {{ object.assigned_to_full_name }}
          Employee at
          {{ object.assigned_to_company_name }}

          <router-link :to="{ name: detailsRouteNames.profile, params: { id: object.assigned_to } }">
            <i
              class="fa-solid fa-circle-info"
              data-toggle="tooltip"
              title="Contact Info"
            />
          </router-link>
        </td>
      </tr>
      <tr>
        <th>Last Updated:</th>
        <td>{{ formatDate(object.last_updated) }}</td>
      </tr>
    </template>
    <template #extra-functions-footer="{ ...object }">
      <div class="form-main form-main--filters">
        <div class="form__foot">
          <button
            v-if="object.report_status === 'Done' && userStore.getCurrentUser.id === object.user"
            class="btn btn-success"
            @click.prevent="handleReviewCreation(object)"
          >
            Create Review
          </button>
        </div>
      </div>
    </template>
  </DetailsView>
</template>

<style scoped>

</style>
