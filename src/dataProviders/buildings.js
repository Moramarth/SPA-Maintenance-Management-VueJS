import axios from 'axios';
import { authHeaders } from '../helpers/authValidation';

const apiURL = 'http://127.0.0.1:8000/api/estate/buildings/';

async function getBuildings() {
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

async function getBuildingById(id) {
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

export { getBuildings, getBuildingById };
