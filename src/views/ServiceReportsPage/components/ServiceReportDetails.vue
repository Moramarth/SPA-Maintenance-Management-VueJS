<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { singleObjectIsValid } from '../../../helpers/loadSingleObject';
import { useUsersStore } from '../../../stores/usersStore';
import { useTempObjectStore } from '../../../stores/tempObjectsStore';
import { formatDate } from '../../../helpers/formatDate';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import {
  commonRouteNames,
  createRouteNames, deleteRouteNames,
  detailsRouteNames,
  editRouteNames,
  listRouteNames
} from "../../../router/routeNames.js";

const route = useRoute();
const router = useRouter();
const userStore = useUsersStore();
const tempObjStore = useTempObjectStore();

const object = ref({});
const userCanEdit = computed(() => userStore.authenticationStatus && userStore.getCurrentUser.id === object.value.user);

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === detailsRouteNames.serviceReport)
        object.value = await dataObjectMapping.serviceReport(route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: commonRouteNames.pageNotFound });
    },

    { immediate: true },
  );
});

async function handleReviewCreation() {
  await tempObjStore.setTempObject(object.value.id);
  router.push({ name: createRouteNames.review });
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Service Report Details</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--filters">
          <div class="form__wrap">
            <div class="form__foot">
              <template v-if="userCanEdit">
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
              <router-link class="btn btn-primary" :to="{ name: listRouteNames.serviceReport }">
                View Service Reports
              </router-link>
            </div>
          </div>
        </div>

        <div class="section__body-group">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr class="table table-light">
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
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
              </tbody>
              <thead>
                <tr class="table table-light">
                  <th />
                  <th />
                </tr>
              </thead>
            </table>
          </div>

          <div class="form-main form-main--filters">
            <div class="form__foot">
              <button v-if="object.report_status === 'Done' && userStore.getCurrentUser.id === object.user" class="btn btn-success" @click.prevent="handleReviewCreation">
                Create Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
