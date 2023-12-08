import { createRouter, createWebHistory } from 'vue-router';
import { commonRoutes } from './commonRoutes';
import { buildingRoutes } from './buildingsRoutes';
import { companiesRoutes } from './companiesRoutes';

const routes = [
  ...commonRoutes,
  ...buildingRoutes,
  ...companiesRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
