import { authHeaders } from '../helpers/authValidation';
import { axiosInstance } from './axiosInstance';

const buildingsURLs = {
  allBuildings: 'estate/buildings/',
  singleBuilding: {
    details: id => `estate/buildings/${id}/`,
  },
};
const errorFetchingMsg = 'Error fetching data:';

async function getBuildings() {
  try {
    const response = await axiosInstance.get(buildingsURLs.allBuildings, {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return [];
  }
}

async function getBuildingById(id) {
  try {
    const response = await axiosInstance.get(buildingsURLs.singleBuilding.details(id), {
      headers: authHeaders(),
    });
    return response.data;
  }
  catch (error) {
    console.error(errorFetchingMsg, error);
    return {};
  }
}

export { getBuildings, getBuildingById };
