import { createApp } from 'vue';
import './styles/load.css';
import { createPinia } from 'pinia';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import App from './App.vue';
import { router } from './router/routerMain';
import { useUsersStore } from './stores/usersStore';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  },
});
const userStore = useUsersStore();
userStore.getPersistedUser();

app.mount('#app');
