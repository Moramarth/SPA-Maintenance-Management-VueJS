import Buildings from '../views/ComponentContainers/Buildings.vue';

export const buildingRoutes = [
  { path: '/buildings', component: Buildings, name: 'show-all-buildings' },
  { path: '/buildings/:id', component: Buildings, name: 'building-details' },

];
