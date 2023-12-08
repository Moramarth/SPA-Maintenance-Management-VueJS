import Home from '../views/Home/Home.vue';
import RegisterInfo from '../views/RegisterInfo/RegisterInfo.vue';
import Login from '../views/Login/Login.vue';

export const commonRoutes = [
  { path: '/', component: Home, name: 'home-page' },
  { path: '/register-info', component: RegisterInfo, name: 'register-info-page' },
  { path: '/login', component: Login, name: 'login-page' },
];
