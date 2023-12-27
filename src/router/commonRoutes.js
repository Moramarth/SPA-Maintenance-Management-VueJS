import RegisterInfo from '../views/RegisterInfo/RegisterInfo.vue';
import Login from '../views/Login/Login.vue';
import { useUsersStore } from '../stores/usersStore';

export const commonRoutes = [
  { path: '/register-info', component: RegisterInfo, name: 'register-info-page' },
  { path: '/', component: Login, name: 'login-page', beforeEnter: () => {
    const userStore = useUsersStore();
    return userStore.isAuthenticated ? { name: 'profile-details', params: { id: userStore.getCurrentUser.id } } : true;
  } },
];
