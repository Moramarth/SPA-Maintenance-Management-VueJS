<script>
import LoadSpinner from '../../../components/LoadSpinner.vue';
import { getCompanyAddress } from '../../../dataProviders/companies';
import { getBuildingById } from '../../../dataProviders/buildings';

export default {
  components: {
    LoadSpinner,
  },
  props: {
    companyId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      address: {},
      building: {},
    };
  },

  async created() {
    this.address = await getCompanyAddress(this.companyId);
    this.building = await getBuildingById(this.address.building);
    this.isLoading = false;
  },

};
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
      <router-link :to="{ name: 'building-details', params: { id: building.id } }" target="_blank">
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

<style lang="scss" scoped>

</style>
