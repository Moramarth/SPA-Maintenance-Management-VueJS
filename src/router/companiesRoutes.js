import Companies from '../views/ComponentContainers/Companies.vue';

export const companiesRoutes = [
  { path: '/partners', component: Companies, name: 'show-all-companies' },
  { path: '/partners/details/:id', component: Companies, name: 'company-details' },
];
