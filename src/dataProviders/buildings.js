import axios from 'axios';

const apiURL = 'http://127.0.0.1:8000/api/estate/buildings/';

async function getBuildings() {
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getBuildingById(id) {
  try {
    const response = await axios.get(`${apiURL}${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export { getBuildings, getBuildingById };
