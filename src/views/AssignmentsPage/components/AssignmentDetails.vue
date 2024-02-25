<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { singleObjectIsValid } from '../../../helpers/loadSingleObject';
import { formatDate } from '../../../helpers/formatDate';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';

const route = useRoute();
const router = useRouter();

const object = ref({});

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'assignment-details')
        object.value = await dataObjectMapping.assingment(route.params.id);
      if (!singleObjectIsValid(object.value))
        router.push({ name: 'NotFound' });
    },

    { immediate: true },
  );
});
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Assignment Details</h1>
      </div>
      <div class="section__body">
        <div class="form-main form-main--filters">
          <div class="form__wrap">
            <div class="form__foot">
              <router-link class="btn btn-primary" :to="{ name: 'show-all-assignments' }">
                Back to assignments
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

                    <router-link :to="{ name: 'profile-details', params: { id: object.assigned_by } }">
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
                    <router-link :to="{ name: 'profile-details', params: { id: object.user } }">
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
                    ToDo: Link to meeting
                  </td>
                </tr>

                <tr v-if="object.expense_estimate_available">
                  <th>Offer:</th>
                  <td>
                    ToDo: Link to Offer
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
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
