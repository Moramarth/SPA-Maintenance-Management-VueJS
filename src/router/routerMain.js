import { createRouter, createWebHistory } from 'vue-router';
import { commonRoutes } from './commonRoutes';
import { buildingRoutes } from './buildingsRoutes';

const routes = [
  ...commonRoutes,
  ...buildingRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
