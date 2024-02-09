import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getServiceReportById } from '../dataProviders/serviceReports';

export const useTempObjectStore = defineStore('tempObjects', () => {
  const tempObject = ref(null);

  const getTempObject = computed(() => tempObject.value);

  async function setTempObject(id) {
    tempObject.value = JSON.stringify(await getServiceReportById(id));
    localStorage.setItem('tempObj', tempObject.value);
    loadTempObject();
  }
  function loadTempObject() {
    const persisted = localStorage.getItem('tempObj');
    if (!persisted)
      return;
    tempObject.value = JSON.parse(persisted);
  }
  function clearTempObject() {
    tempObject.value = null;
    localStorage.removeItem('tempObj');
  }
  return {
    tempObject,
    getTempObject,
    setTempObject,
    loadTempObject,
    clearTempObject,
  };
});
