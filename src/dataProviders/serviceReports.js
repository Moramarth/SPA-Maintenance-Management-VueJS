import axios from 'axios';

const apiURL = 'http://127.0.0.1:8000/api/clients/service-reports/';

async function getServiceReports() {
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
  try {
    const response = await axios.post(apiURL, reportData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function getServiceReportById(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function editServiceReport(id, reportData) {
  try {
    const response = await axios.patch(`${apiURL}${id}/`, reportData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function deleteServiceReport(id) {
  try {
    const response = await axios.delete(`${apiURL}${id}/`L);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export { getServiceReports, getServiceReportById, deleteServiceReport, editServiceReport, createServiceReport };
