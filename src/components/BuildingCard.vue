<script setup>
import {detailsRouteNames} from "../router/routeNames.js";

const props = defineProps({
  building: {
    type: Object,
    required: true,
    default: () => {
      return {
        id: -1,
        name: 'Building Name',
        file: 'default_building_picture.png',
        city: 'Building City',
      };
    },
  },
});
</script>

<template>
  <div class="col">
    <div class="card card--box">
      <router-link :to="{ name: detailsRouteNames.building, params: { id: props.building.id } }">
        See Details
      </router-link>
      <img
        v-if="props.building.file"
        :src="props.building.file"
        class="card-img-top"
        alt="Builing image"
      >
      <img
        v-else
        src="../../public/default_building_picture.png"
        class="card-img-top"
        alt="No picture"
      >
      <div class="card-body">
        <h5 class="card-title">
          {{ props.building.name }}
        </h5>
        <p class="card-text">
          {{ props.building.city }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
