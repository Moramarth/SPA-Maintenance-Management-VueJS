<script>
import { getBuildingById } from '../../../dataProviders/buildings';

export default {

  data() {
    return {
      object: {},
    };
  },
  computed: {
    markerDetails() {
      return {
        id: 1,
        position: {
          lat: this.object.latitude,
          lng: this.object.longitude,
        },

      };
    },
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      () => {
        if (this.$route.name === 'building-details')
          this.loadObject();
      },

      { immediate: true },
    );
  },
  methods: {
    async loadObject() {
      const id = this.$route.params.id;
      this.object = await getBuildingById(id);
    },
  },
};
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
