import { createApp } from 'vue';
import './styles/load.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router/routerMain';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
