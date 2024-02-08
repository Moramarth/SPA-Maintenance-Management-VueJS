import { validateUser } from '../helpers/authValidation';

const Buildings = () => import('../views/BuildingsPage/Buildings.vue');
const BuildingsList = () => import('../views/BuildingsPage/components/BuildingsList.vue');
const BuildingDetails = () => import('../views/BuildingsPage/components/BuildingDetails.vue');

export const buildingRoutes = [
  { path: '/buildings', component: Buildings, children: [
    { path: '', component: BuildingsList, name: 'show-all-buildings', beforeEnter: validateUser },
    { path: 'details/:id', component: BuildingDetails, name: 'building-details', beforeEnter: validateUser },
  ] },
];
