<script>
// TODO: Integrate Google Maps API
export default {
  data() {
    return {
      object: {
        name: 'Building name',
        file: 'default_building_picture.png',
        city: 'City name',
        address: 'address',
        tenantsCount: 5,
      },
    };
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
              <img v-else src="default_building_picture.png" alt="Building Picture">
            </div>
            <div class="block__content">
              <div class="block__content-bg">
                <p><strong>Name:</strong> {{ object.name }} </p>
                <p><strong>City:</strong>{{ object.city }} </p>
                <p><strong>Address:</strong>{{ object.address }} </p>
                <p>
                  <strong>Current tenants:</strong> {{ object.tenantsCount }} companies
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="section__body-group">
          <div
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
          />
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
