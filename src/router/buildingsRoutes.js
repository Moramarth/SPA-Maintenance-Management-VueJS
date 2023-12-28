import Buildings from '../views/BuildingsPage/Buildings.vue';
import BuildingsList from '../views/BuildingsPage/components/BuildingsList.vue';
import BuildingDetails from '../views/BuildingsPage/components/BuildingDetails.vue';
import { validateUser } from '../helpers/authValidation';

export const buildingRoutes = [
  { path: '/buildings',component: Buildings,children: [
      { path: '', component: BuildingsList, name: 'show-all-buildings', beforeEnter: validateUser },
      { path: 'details/:id', component: BuildingDetails, name: 'building-details', beforeEnter: validateUser },
    ] },

];
