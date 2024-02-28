import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const offersURL = {
  allOffers: 'contractors/expenses-estimates/',
  singleOffer: {
    details: id => `contractors/expenses-estimates/${id}/`,
    edit: id => `contractors/expenses-estimates/${id}/`,
    delete: id => `contractors/expenses-estimates/${id}/`,
  },
};
const errorFetchingMsg = 'Error fetching data:';

async function getOffers() {
  try {
    const response = await axiosInstance.get(offersURL.allOffers, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function getOfferById(id) {
  try {
    const response = await axiosInstance.get(offersURL.singleOffer.details(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function editOffer(id, offerData) {
  try {
    const response = await axiosInstance.patch(offersURL.singleOffer.edit(id), offerData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function deleteOffer(id) {
  try {
    const response = await axiosInstance.delete(offersURL.singleOffer.delete(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

async function createOffer(offerData) {
  try {
    const response = await axiosInstance.post(offersURL.allOffers, offerData, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

export {
  createOffer,
  getOffers,
  getOfferById,
  editOffer,
  deleteOffer,
};
