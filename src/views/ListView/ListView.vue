<script>
import CompaniesList from './components/CompaniesList.vue';
import ReviewsList from './components/ReviewsList.vue';
import ServiceReportsList from './components/ServiceReportsList.vue';

export default {
  components: {
    CompaniesList,
    ReviewsList,
    ServiceReportsList,
  },
  props: {
    listType: {
      type: String,
      required: true,
    },
    array: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headingText: {
        AssignmentsList: 'Assignments',
        BuildingsList: 'Our Buildings',
        CompaniesList: 'Our Partners',
        MeetingsList: 'Meetings',
        OffersList: 'Offers',
        ReviewsList: 'Reviews',
        ServiceReportsList: 'Service Reports',
      },
    };
  },
};
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section__head">
        <h1>{{ headingText[listType] }}</h1>
      </div>
      <div class="section__body">
        <component :is="listType" :array="array" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
