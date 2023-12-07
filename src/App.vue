<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import RegisterInfo from './views/RegisterInfo/RegisterInfo.vue';
import Home from './views/Home/Home.vue';
import ListView from './views/ListView/ListView.vue';
import DetailsView from './views/DetailsView/DetailsView.vue';
import DeleteView from './views/DeleteView/DeleteView.vue';
import CreateView from './views/CreateView/CreateView.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
    RegisterInfo,
    Home,
    ListView,
    DetailsView,
    DeleteView,
    CreateView,
  },
  data() {
    return {
      view: 'CreateView',
    };
  },
};
</script>

<template>
  <div class="wrapper__inner">
    <AppHeader />
    <main class="main">
      <div class="main__background">
        <img src="/main_bg.jpg" alt="">
      </div>

      <div class="container">
        <component :is="view" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style>
.main {
    width: 100%;
    position: relative;
}

.main > .container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 8.5rem - 7.1rem);
    padding-top: 4.0rem;
    padding-bottom: 4.0rem;
    position: relative;
    z-index: 10;
}

.main:before {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 30.0rem;
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
}

.main .main__background {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    font-size: 0;
    line-height: 0;
    z-index: -1;
}

.main .main__background img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
}

.main .main__background:after {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255,255,255,0.4);
}
</style>
