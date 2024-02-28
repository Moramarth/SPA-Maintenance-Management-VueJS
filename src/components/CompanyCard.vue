<script setup>
const props = defineProps({
  company: {
    type: Object,
    required: true,
    default: () => {
      return {
        id: -1,
        name: 'Company Name',
        file: '../../public/default_company_logo.jpg',
        business_field: 'Compnay Business Field',
      };
    },
  },
});
</script>

<template>
  <div class="col">
    <div class="card card--box">
      <router-link :to="{ name: 'company-details', params: { id: props.company.id } }">
        See Details
      </router-link>
      <img
        v-if="props.company.file"
        :src="props.company.file"
        class="card-img-top"
        alt="Company logo"
      >
      <img
        v-else
        src="../../public/default_company_logo.jpg"
        class="card-img-top"
        alt="No picture"
      >
      <div class="card-body">
        <h5 class="card-title">
          {{ props.company.name }}
        </h5>
        <p v-if="props.company.business_field" class="card-text">
          {{ props.company.business_field }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
