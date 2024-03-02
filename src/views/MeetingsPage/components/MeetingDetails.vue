<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { singleObjectIsValid } from '../../../helpers/loadSingleObject';
import { useUsersStore } from '../../../stores/usersStore';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import { formatDate } from '../../../helpers/formatDate';
import {
  commonRouteNames,
  deleteRouteNames,
  detailsRouteNames,
  editRouteNames,
  listRouteNames
} from "../../../router/routeNames.js";

const route = useRoute();
const router = useRouter();
const userStore = useUsersStore();

const object = ref({});
const userCanEdit = computed(() => userStore.authenticationStatus && userStore.getCurrentUser.id === object.value.created_by);

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === detailsRouteNames.meeting)
        object.value = await dataObjectMapping.meeting(route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: commonRouteNames.pageNotFound });
    },

    { immediate: true },
  );
});
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Meeting Details</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--filters">
          <div class="form__wrap">
            <div class="form__foot">
              <template v-if="userCanEdit">
                <router-link class="btn btn-warning" :to="{ name: editRouteNames.meeting, params: { id: object.id } }">
                  Edit Meeting
                </router-link>
                <router-link class="btn btn-danger" :to="{ name: deleteRouteNames.meeting, params: { id: object.id } }">
                  Delete Meeting
                </router-link>
              </template>
              <router-link class="btn btn-primary" :to="{ name: listRouteNames.meeting }">
                Back To Meetings
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
                  <th>Description:</th>
                  <td>{{ object.description }}</td>
                </tr>
                <tr>
                  <th>Meeting date:</th>
                  <td>
                    {{ formatDate(object.meeting_date) }}
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
              </tbody>
              <thead>
                <tr class="table table-light">
                  <th />
                  <th />
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
