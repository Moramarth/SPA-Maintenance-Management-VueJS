import { getUserById } from './auth.js';
import { getBuildingById, getBuildings } from './buildings.js';
import { getCompanies, getCompanyAddress, getCompanyById, getCompanyEmployees } from './companies.js';
import { getProfileById } from './profile.js';
import { getReviewById, getReviews } from './reviews.js';
import { getServiceReportById, getServiceReports } from './serviceReports.js';
import { getAssignmentById, getAssignments } from './assignments.js';

const dataArrayMapping = {
  assignments: getAssignments,
  buildings: getBuildings,
  companies: getCompanies,
  companyEmployees: getCompanyEmployees,
  reviews: getReviews,
  serviceReports: getServiceReports,
};

const dataObjectMapping = {
  assingment: getAssignmentById,
  building: getBuildingById,
  company: getCompanyById,
  companyAddress: getCompanyAddress,
  profile: getProfileById,
  review: getReviewById,
  serviceReport: getServiceReportById,
  user: getUserById,
};

export { dataArrayMapping, dataObjectMapping };
