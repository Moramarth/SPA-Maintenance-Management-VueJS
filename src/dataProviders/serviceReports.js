import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const serviceReportsURLs = {
  allServiceReports: 'clients/service-reports/',
  singleServiceReport: {
    details: id => `clients/service-reports/${id}/`,
    edit: id => `clients/service-reports/${id}/`,
    delete: id => `clients/service-reports/${id}/`,
  },
};
const errorFetchingMsg = 'Error fetching data:';

async function getServiceReports() {
  try {
    const response = await axiosInstance.get(serviceReportsURLs.allServiceReports, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function createServiceReport(reportData) {
  try {
    const response = await axiosInstance.post(serviceReportsURLs.allServiceReports, reportData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function getServiceReportById(id) {
  try {
    const response = await axiosInstance.get(serviceReportsURLs.singleServiceReport.details(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function editServiceReport(id, reportData) {
  try {
    const response = await axiosInstance.patch(serviceReportsURLs.singleServiceReport.edit(id), reportData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function deleteServiceReport(id) {
  try {
    const response = await axiosInstance.delete(serviceReportsURLs.singleServiceReport.delete(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

export { getServiceReports, getServiceReportById, deleteServiceReport, editServiceReport, createServiceReport };
