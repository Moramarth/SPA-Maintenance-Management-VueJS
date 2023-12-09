import Buildings from '../views/BuildingsPage/Buildings.vue';
import BuildingsList from '../views/BuildingsPage/components/BuildingsList.vue';
import BuildingDetails from '../views/BuildingsPage/components/BuildingDetails.vue';

export const buildingRoutes = [
  { path: '/buildings',component: Buildings,children: [
      { path: '', component: BuildingsList, name: 'show-all-buildings' },
      { path: 'details/:id', component: BuildingDetails, name: 'building-details' },
    ] },

];
