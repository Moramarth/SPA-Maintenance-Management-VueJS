import { createApp } from 'vue';
import './styles/load.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router/routerMain';
import { useUsersStore } from './stores/usersStore';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
const userStore = useUsersStore();
userStore.getPersistedUser();
userStore.loadProfiles();

app.mount('#app');
