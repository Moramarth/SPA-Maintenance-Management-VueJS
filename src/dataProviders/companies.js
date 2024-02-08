import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const companiesURLs = {
  allCompanies: 'companies/',
  singleCompany: {
    details: id => `companies/${id}/`,
    address: id => `companies/${id}/address/`,
    employees: id => `companies/${id}/employees/`,
  },
};
const errorFetchingMsg = 'Error fetching data:';

async function getCompanies() {
  try {
    const response = await axiosInstance.get(companiesURLs.allCompanies, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function getCompanyById(id) {
  try {
    const response = await axiosInstance.get(companiesURLs.singleCompany.details(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function getCompanyAddress(id) {
  try {
    const response = await axiosInstance.get(companiesURLs.singleCompany.address(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}
async function getCompanyEmployees(id) {
  try {
    const response = await axiosInstance.get(companiesURLs.singleCompany.employees(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function editCompany(id, companyData) {
  try {
    const response = await axiosInstance.patch(companiesURLs.singleCompany.details(id), companyData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

export { getCompanies, getCompanyById, getCompanyAddress, editCompany, getCompanyEmployees };
