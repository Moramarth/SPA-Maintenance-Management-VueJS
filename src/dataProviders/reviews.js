import axios from 'axios';

async function getReviews() {
  const apiURL = 'http://127.0.0.1:8000/api/clients/reviews/';
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export { getReviews };
