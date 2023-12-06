<script>
import AssignmentsList from './components/AssignmentsList.vue';
import BuildingsList from './components/BuildingsList.vue';
import CompaniesList from './components/CompaniesList.vue';
import MeetingsList from './components/MeetingsList.vue';
import OffersList from './components/OffersList.vue';
import ReviewsList from './components/ReviewsList.vue';
import ServiceReportsList from './components/ServiceReportsList.vue';

export default {
  components: {
    AssignmentsList,
    BuildingsList,
    CompaniesList,
    MeetingsList,
    OffersList,
    ReviewsList,
    ServiceReportsList,
  },
  data() {
    return {
      list: 'MeetingsList',
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
        <h1>{{ headingText[list] }}</h1>
      </div>
      <div class="section__body">
        <component :is="list" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
