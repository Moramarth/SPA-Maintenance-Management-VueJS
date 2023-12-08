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
      buildings: [],
      listType: 'BuildingsList',
      buildingObject: null,
      objectType: 'BuildingDetails',
    };
  },

};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <template v-else>
    <DetailsView v-if="buildingObject" :object-type="objectType" :object="buildingObject" />
    <ListView v-else-if="buildings" :list-type="listType" :array="buildings" />
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
