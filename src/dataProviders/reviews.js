import axios from 'axios';

const apiURL = 'http://127.0.0.1:8000/api/clients/reviews/';

async function getReviews() {
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
  try {
    const response = await axios.get(`${apiURL}${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function createReview(reviewData) {
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
  try {
    const response = await axios.patch(`${apiURL}${id}/`, reviewData);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function deleteReview(id) {
  try {
    const response = await axios.delete(`${apiURL}${id}/`);
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export { getReviews, getReviewById, editReview, deleteReview, createReview };
