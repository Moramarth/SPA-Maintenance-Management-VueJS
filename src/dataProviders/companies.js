import axios from 'axios';
import { authHeaders } from '../helpers/authValidation';

const apiURL = 'http://127.0.0.1:8000/api/companies/';

async function getCompanies() {
  try {
    const response = await axios.get(apiURL, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getCompanyById(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/`, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function getCompanyAddress(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/address/`, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}
async function getCompanyEmployees(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/employees/`, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function editCompany(id, companyData) {
  try {
    const response = await axios.patch(`${apiURL}${id}/`, companyData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export { getCompanies, getCompanyById, getCompanyAddress, editCompany, getCompanyEmployees };
