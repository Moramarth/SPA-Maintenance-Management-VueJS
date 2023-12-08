<script>
import LoadSpinner from '../../components/LoadSpinner.vue';
import DetailsView from '../DetailsView/DetailsView.vue';
import ListView from '../ListView/ListView.vue';

export default {
  components: {
    LoadSpinner,
    DetailsView,
    ListView,
  },
  data() {
    return {
      isLoading: false,
      partners: null,
      listType: 'CompaniesList',
      companyObject: {},
      objectType: 'CompanyDetails',
    };
  },
};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <template v-else>
    <DetailsView v-if="companyObject" :object-type="objectType" :object="companyObject" />
    <ListView v-else-if="partners" :list-type="listType" :array="partners" />
  </template>
</template>

<style scoped>
.spinner-border {
  position: absolute;
  top: calc(50% - 2.5rem);
  left: calc(50% - 2.5rem);
  width: 5rem;
  height: 5rem;
}
</style>
