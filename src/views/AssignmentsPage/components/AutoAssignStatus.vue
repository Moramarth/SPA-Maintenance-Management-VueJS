<script setup>
import { onMounted, ref } from 'vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { autoAssignReports } from '../../../dataProviders/assignments';
import {listRouteNames} from "../../../router/routeNames.js";

const isLoading = ref(true);
const statusMessage = ref('');

onMounted(async () => {
  const data = await autoAssignReports();
  const assignedCount = data.reports_assigned_count;
  if (assignedCount === 1)
    statusMessage.value = `${assignedCount} report was automatically assigned!`;
  else
    statusMessage.value = `${assignedCount} reports were automatically assigned!`;
});
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>Auto Assignment</h1>
      </div>

      <div class="section__body">
        <LoadSpinner v-if="isLoading" />
        <div v-else class="form-main form-main--login">
          <div class="section__body-group">
            <h2>{{ statusMessage }}</h2>
            <div class="form__foot">
              <router-link :to="{ name: listRouteNames.assignment }">
                Back to reports
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
