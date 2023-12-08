<script>
import AssignmentDetails from './components/AssignmentDetails.vue';
import BuildingDetails from './components/BuildingDetails.vue';
import CompanyDetails from './components/CompanyDetails.vue';
import ReviewDetails from './components/ReviewDetails.vue';
import ServiceReportDetails from './components/ServiceReportDetails.vue';

export default {
  components: {
    AssignmentDetails,
    BuildingDetails,
    CompanyDetails,
    ReviewDetails,
    ServiceReportDetails,
  },
  props: {
    objectType: {
      type: String,
      required: true,
    },
    object: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      headingText: {
        AssignmentDetails: 'Assignment Details',
        BuildingDetails: 'Building Details',
        CompanyDetails: 'Company Details',
        MeetingDetails: 'Meeting Details',
        OfferDetails: 'Offer Details',
        ReviewDetails: 'Review Details',
        ServiceReportDetails: 'Service Report Details',
      },
    };
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>{{ headingText[objectType] }}</h1>
      </div>
      <div class="section__body">
        <component :is="objectType" :object="object" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
