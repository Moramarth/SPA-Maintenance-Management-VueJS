<script setup>
import DetailsView from '../../../components/defaultViews/DetailsView.vue';
import { conditionalObjectRendering } from '../../../constants/conditionalRendering.js';

const conditions = structuredClone(conditionalObjectRendering);
conditions.representedAs.customPage = true;
</script>

<template>
  <DetailsView
    :object-type="conditions.building"
    :object-represented-as="conditions.representedAs"
  >
    <template #page-header>
      Building Details
    </template>
    <template #custom-page-body="{ ...object }">
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
            :key="1"
            :position="{ lat: object.latitude, lng: object.longitude }"
            :clickable="true"
            :draggable="false"
          />
        </GMapMap>
      </div>
    </template>
  </DetailsView>
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
