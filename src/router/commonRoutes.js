import { validateUser } from '../helpers/authValidation';
import { useUsersStore } from '../stores/usersStore';
import Login from '../views/Login/Login.vue';

const RegisterInfo = () => import('../views/RegisterInfo/RegisterInfo.vue');
const RegisterInvite = () => import('../components/RegisterInvitation.vue');

export const commonRoutes = [
  { path: '/register-info', component: RegisterInfo, name: 'register-info-page' },
  { path: '/',component: Login,name: 'login-page', beforeEnter: () => {
      const userStore = useUsersStore();
      return userStore.authenticationStatus ? { name: 'profile-details', params: { id: userStore.getCurrentUser.id } } : true;
    } },
  { path: '/register-invite', RegisterInvite, name: 'register-invite', beforeEnter: validateUser },
];
