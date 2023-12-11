import axios from 'axios';

async function getCompanies() {
  const apiURL = 'http://127.0.0.1:8000/api/companies/';
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
  const apiURL = `http://127.0.0.1:8000/api/companies/${id}`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getCompanyAddress(id) {
  const apiURL = `http://127.0.0.1:8000/api/companies/${id}/address/`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export { getCompanies, getCompanyById, getCompanyAddress };
