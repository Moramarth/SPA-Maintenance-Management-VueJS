<script>
export default {
  props: {
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
  },
};
</script>

<template>
  <div class="col">
    <div class="card card--box">
      <router-link :to="{ name: 'building-details', params: { id: building.id } }">
        See Details
      </router-link>
      <img
        v-if="building.file"
        :src="building.file"
        class="card-img-top"
        alt="Builing image"
      >
      <img
        v-else
        src="default_building_picture.png"
        class="card-img-top"
        alt="No picture"
      >
      <div class="card-body">
        <h5 class="card-title">
          {{ building.name }}
        </h5>
        <p class="card-text">
          {{ building.city }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
