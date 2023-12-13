import { defineStore } from 'pinia';
import { getServiceReportById } from '../dataProviders/serviceReports';

export const useTempObjectStore = defineStore('tempObjects', {
  state: () => ({
    tempObject: null,
  }),
  getters: {
    getTempObject: state => state.tempObject,
  },
  actions: {
    async setTempObject(id) {
      this.tempObject = JSON.stringify(await getServiceReportById(id));
      localStorage.setItem('tempObj', this.tempObject);
      this.loadTempObject();
    },
    loadTempObject() {
      const persisted = localStorage.getItem('tempObj');
      if (!persisted)
        return;
      this.tempObject = JSON.parse(persisted);
    },
    clearTempObject() {
      this.tempObject = null;
      localStorage.removeItem('tempObj');
    },
  },

});
