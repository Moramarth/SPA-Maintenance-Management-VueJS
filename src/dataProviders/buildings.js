import axios from 'axios';

async function getBuildings() {
  const apiURL = 'http://127.0.0.1:8000/api/buildings/';
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export { getBuildings };
