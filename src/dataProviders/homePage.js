import axios from 'axios';

async function getHomePage() {
  const apiURL = 'http://127.0.0.1:8000/api/home-page/';
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export { getHomePage };
