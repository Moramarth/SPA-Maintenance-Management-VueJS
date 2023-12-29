import axios from 'axios';
import { authHeaders } from '../helpers/authValidation';

const apiURL = 'http://127.0.0.1:8000/api/clients/reviews/';

async function getReviews() {
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

async function getReviewById(id) {
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

async function createReview(reviewData) {
  try {
    const response = await axios.post(apiURL, reviewData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function editReview(id, reviewData) {
  try {
    const response = await axios.patch(`${apiURL}${id}/`, reviewData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

async function deleteReview(id) {
  try {
    const response = await axios.delete(`${apiURL}${id}/`, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

export { getReviews, getReviewById, editReview, deleteReview, createReview };
