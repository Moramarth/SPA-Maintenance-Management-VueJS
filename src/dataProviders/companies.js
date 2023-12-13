import axios from 'axios';

const apiURL = 'http://127.0.0.1:8000/api/companies/';

async function getCompanies() {
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getCompanyById(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function getCompanyAddress(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/address/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}
async function getCompanyEmployees(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/employees/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function editCompany(id, companyData) {
  try {
    const response = await axios.patch(`${apiURL}${id}/`, companyData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export { getCompanies, getCompanyById, getCompanyAddress, editCompany, getCompanyEmployees };
