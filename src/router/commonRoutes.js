import { validateUser } from '../helpers/authValidation';
import { useUsersStore } from '../stores/usersStore';
import Login from '../views/Login/Login.vue';
import { commonRouteNames, detailsRouteNames } from './routeNames';

const RegisterInfo = () => import('../views/RegisterInfo/RegisterInfo.vue');
const RegisterInvite = () => import('../components/RegisterInvitation.vue');

export const commonRoutes = [
  { path: '/register-info', component: RegisterInfo, name: commonRouteNames.registerInfo },
  { path: '/',component: Login, name: commonRouteNames.login, beforeEnter: () => {
      const userStore = useUsersStore();
      return userStore.authenticationStatus ? { name: detailsRouteNames.profile, params: { id: userStore.getCurrentUser.id } } : true;
    } },
  { path: '/register-invite', RegisterInvite, name: commonRouteNames.registerInvitation, beforeEnter: validateUser },
];
