<script setup>
import { onMounted, ref, watch } from 'vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { dataObjectMapping } from '../../../dataProviders/dataLoadMapping';
import { detailsRouteNames } from '../../../router/routeNames.js';

const props = defineProps({
  companyId: {
    type: Number,
    required: true,
  },
});

const isLoading = ref(true);
const address = ref({});
const building = ref({});

onMounted (async () => {
  watch(() => props.companyId, async (newCompanyId) => {
    address.value = await dataObjectMapping.companyAddress(newCompanyId);
    building.value = await dataObjectMapping.building(address.value.building);
    isLoading.value = false;
  });
});
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <div v-else class="container">
    <div class="form-main form-main--login">
      <div class="form__label">
        <label>Address:</label>
      </div>
      <p> {{ building.city }}, {{ building.address }}</p>
      <div class="form__label">
        <label>Building:</label>
      </div>
      {{ building.name }}
      <router-link :to="{ name: detailsRouteNames.building, params: { id: building.id } }" target="_blank">
        <i
          class="fa-solid fa-arrow-right-to-bracket"
          data-toggle="tooltip"
          title="See Details"
        />
      </router-link>

      <div class="form__label">
        <label>Location:</label>
      </div>
      <span v-if="address.section">{{ address.section }}, </span>
      floor {{ address.floor }},
      office {{ address.office_number }}
    </div>
  </div>
</template>

<style scoped>
</style>
