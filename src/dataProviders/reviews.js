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

async function getReviewById(id) {
  const apiURL = `http://127.0.0.1:8000/api/clients/reviews/${id}/`;
  try {
    const response = await axios.get(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function createReview(reviewData) {
  const apiURL = `http://127.0.0.1:8000/api/clients/reviews/`;
  try {
    const response = await axios.post(apiURL, reviewData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function editReview(id, reviewData) {
  const apiURL = `http://127.0.0.1:8000/api/clients/reviews/${id}/`;
  try {
    const response = await axios.patch(apiURL, reviewData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function deleteReview(id) {
  const apiURL = `http://127.0.0.1:8000/api/clients/reviews/${id}/`;
  try {
    const response = await axios.delete(apiURL);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export { getReviews, getReviewById, editReview, deleteReview, createReview };
