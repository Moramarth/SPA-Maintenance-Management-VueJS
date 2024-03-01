import { getUserById } from './auth.js';
import { getBuildingById, getBuildings } from './buildings.js';
import { getCompanies, getCompanyAddress, getCompanyById, getCompanyEmployees } from './companies.js';
import { getProfileById } from './profile.js';
import { deleteReview, getReviewById, getReviews } from './reviews.js';
import { deleteServiceReport, getServiceReportById, getServiceReports } from './serviceReports.js';
import { deleteAssignment, getAssignmentById, getAssignments } from './assignments.js';
import { deleteOffer, getOfferById, getOffers } from './offers.js';
import { deleteMeeting, getMeetingById, getMeetings } from './meetings.js';

const dataArrayMapping = {
  assignments: getAssignments,
  buildings: getBuildings,
  companies: getCompanies,
  companyEmployees: getCompanyEmployees,
  meetings: getMeetings,
  offers: getOffers,
  reviews: getReviews,
  serviceReports: getServiceReports,
};

const dataObjectMapping = {
  assignment: getAssignmentById,
  building: getBuildingById,
  company: getCompanyById,
  companyAddress: getCompanyAddress,
  meeting: getMeetingById,
  offer: getOfferById,
  profile: getProfileById,
  review: getReviewById,
  serviceReport: getServiceReportById,
  user: getUserById,
};

const deleteObjectMapping = {
  assignment: deleteAssignment,
  meeting: deleteMeeting,
  offer: deleteOffer,
  review: deleteReview,
  serviceReport: deleteServiceReport,
};

export { dataArrayMapping, dataObjectMapping, deleteObjectMapping };
