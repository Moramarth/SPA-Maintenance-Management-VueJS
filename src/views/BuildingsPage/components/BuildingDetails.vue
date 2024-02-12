<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadSingleObject, singleObjectIsValid } from '../../../helpers/loadSingleObject';

const router = useRouter();
const route = useRoute();

const object = ref({});
const markerDetails = computed(() => {
  return {
    id: 1,
    position: {
      lat: object.value.latitude,
      lng: object.value.longitude,
    },
  };
});

onMounted (() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'building-details')
        object.value = await loadSingleObject(route.params.id, 'building');
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
        <h1>Building Details</h1>
      </div>
      <div class="section__body">
        <div class="section__body-group">
          <div class="block-review">
            <div class="block__image">
              <img v-if="object.file" :src="object.file" alt="Building Picture">
              <img v-else src="../../../../public/default_building_picture.png" alt="Building Picture">
            </div>
            <div class="block__content">
              <div class="block__content-bg">
                <p><strong>Name:</strong> {{ object.name }} </p>
                <p><strong>City:</strong>{{ object.city }} </p>
                <p><strong>Address:</strong>{{ object.address }} </p>
                <p>
                  <strong>Current tenants:</strong> {{ String(object.tenants) }} companies
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="section__body-group">
          <!-- <div
    v-if="!object.latitude || !object.longitude"
    class="block-map js-block-map"
    data-lat="{{ object.latitude }}"
    data-lng="{{ object.longitude }}"
    data-title="{{ object.city }} {{ object.address }}"
  />
  <div
    v-else
    id="map"
    class="block__map"
    data-lat="42.56422429111076"
    data-lng="25.2266924234375"
    data-title="Bulgaria"
  /> -->

          <GMapMap

            :center="{ lat: object.latitude, lng: object.longitude }"
            :zoom="13"
            map-type-id="roadmap"
            style="width: 100%; height: 60rem"
            :options="{
              zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              streetViewControl: true,
              rotateControl: true,
              fullscreenControl: true,
            }"
          >
            <GMapMarker
              :key="markerDetails.id"
              :position="markerDetails.position"
              :clickable="true"
              :draggable="false"
            />
          </GMapMap>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.block-map {
    width: 100%;
}

.block-map .block__map {
    width: 100%;
    height: 0;
    padding-top: 50%;
    position: relative;
    overflow: hidden;
}
</style>
