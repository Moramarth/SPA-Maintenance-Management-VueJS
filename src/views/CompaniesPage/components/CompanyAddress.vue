<script setup>
import { onMounted, ref } from 'vue';
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { getCompanyAddress } from '../../../dataProviders/companies';
import { getBuildingById } from '../../../dataProviders/buildings';

const props = defineProps({
  companyId: {
    type: Number,
    required: true,
  },
});

const isLoading = ref(true);
const address = ref({});
const building = ref({});

onMounted(async () => {
  address.value = await getCompanyAddress(props.companyId);
  building.value = await getBuildingById(address.value.building);
  isLoading.value = false;
});
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <div v-else class="container">
    <div class="form-main form-main--login">
      <div class="form__label">
        <label>Address:</label>
      </div>
      <p>{{ building.value.city }}, {{ building.value.address }}</p>

      <div class="form__label">
        <label>Building:</label>
      </div>
      {{ building.value.name }}
      <router-link :to="{ name: 'building-details', params: { id: address.value.buildingID } }" target="_blank">
        <i
          class="fa-solid fa-arrow-right-to-bracket"
          data-toggle="tooltip"
          title="See Details"
        />
      </router-link>

      <div class="form__label">
        <label>Location:</label>
      </div>
      <span v-if="address.value.section">{{ address.value.section }},</span>
      floor {{ address.value.floor }},
      office {{ address.value.office_number }}
    </div>
  </div>
</template>

<style scoped>
</style>
