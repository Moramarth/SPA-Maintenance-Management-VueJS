<script>
export default {
  props: {
    company: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: 'Company Name',
          file: 'default_company_logo.jpg',
          businessField: 'Compnay Business Field',
        };
      },
    },
  },
};
</script>

<template>
  <div class="col">
    <div class="card card--box">
      <a href="#">See Details</a>
      <img
        v-if="company.file"
        :src="company.file"
        class="card-img-top"
        alt="Company logo"
      >
      <img
        v-else
        src="default_company_logo.jpg"
        class="card-img-top"
        alt="No picture"
      >
      <div class="card-body">
        <h5 class="card-title">
          {{ company.name }}
        </h5>
        <p v-if="company.businessField" class="card-text">
          {{ company.businessField }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
