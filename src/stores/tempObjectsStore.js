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
      console.log(this.tempObject);
    },
    clearTempObject() {
      this.tempObject = null;
    },
  },

});
