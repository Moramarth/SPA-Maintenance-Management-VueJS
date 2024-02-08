import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const reviewsURLs = {
  allReviews: 'clients/reviews/',
  singleReview: {
    details: id => `clients/reviews/${id}/`,
    edit: id => `clients/reviews/${id}/`,
    delete: id => `clients/reviews/${id}/`,
  },
};
const errorFetchingMsg = 'Error fetching data:';

async function getReviews() {
  try {
    const response = await axiosInstance.get(reviewsURLs.allReviews, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function getReviewById(id) {
  try {
    const response = await axiosInstance.get(reviewsURLs.singleReview.details(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function createReview(reviewData) {
  try {
    const response = await axiosInstance.post(reviewsURLs.allReviews, reviewData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function editReview(id, reviewData) {
  try {
    const response = await axiosInstance.patch(reviewsURLs.singleReview.edit(id), reviewData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function deleteReview(id) {
  try {
    const response = await axiosInstance.delete(reviewsURLs.singleReview.delete(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

export { getReviews, getReviewById, editReview, deleteReview, createReview };
