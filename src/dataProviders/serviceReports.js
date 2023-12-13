import axios from 'axios';

async function getServiceReports() {
  const apiURL = 'http://127.0.0.1:8000/api/clients/service-reports/';
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function createServiceReport(reportData) {
  const apiURL = 'http://127.0.0.1:8000/api/clients/service-reports/';
  try {
    const response = await axios.post(apiURL, reportData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getServiceReportById(id) {
  const apiURL = `http://127.0.0.1:8000/api/clients/service-reports/${id}/`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function editServiceReport(id, reportData) {
  const apiURL = `http://127.0.0.1:8000/api/clients/service-reports/${id}/`;
  try {
    const response = await axios.patch(apiURL, reportData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function deleteServiceReport(id) {
  const apiURL = `http://127.0.0.1:8000/api/clients/service-reports/${id}/`;
  try {
    const response = await axios.delete(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export { getServiceReports, getServiceReportById, deleteServiceReport, editServiceReport, createServiceReport };
