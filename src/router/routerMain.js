import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../views/Errors/404.vue';
import { commonRoutes } from './commonRoutes';
import { buildingRoutes } from './buildingsRoutes';
import { companiesRoutes } from './companiesRoutes';
import { reviewsRoutes } from './reviewsRoutes';
import { serviceReportsRoutes } from './serviceReportsRoutes';

const routes = [
  ...commonRoutes,
  ...buildingRoutes,
  ...companiesRoutes,
  ...reviewsRoutes,
  ...serviceReportsRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
