import { createApp } from 'vue';
import './styles/load.css';
import App from './App.vue';
import { router } from './router/routerMain';

const app = createApp(App);
app.use(router);
app.mount('#app');
