<script>
import LoadSpinner from '../../components/LoadSpinner.vue';

export default {
  components: {
    LoadSpinner,
  },
  data() {
    return {
      isLoading: false,
    };
  },

};
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <router-view v-else />
</template>

<style  scoped>
.spinner-border {
  position: absolute;
  top: calc(50% - 2.5rem);
  left: calc(50% - 2.5rem);
  width: 5rem;
  height: 5rem;
}
</style>
