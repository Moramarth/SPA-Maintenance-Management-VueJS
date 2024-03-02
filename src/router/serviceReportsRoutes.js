import { validateUser } from '../helpers/authValidation';
import { createRouteNames, deleteRouteNames, detailsRouteNames, editRouteNames, listRouteNames } from './routeNames';

const ServiceReports = () => import('../views/ServiceReportsPage/ServiceReports.vue');
const ServiceReportsList = () => import('../views/ServiceReportsPage/components/ServiceReportsList.vue');
const ServiceReportDetails = () => import('../views/ServiceReportsPage/components/ServiceReportDetails.vue');
const CreateServiceReport = () => import('../views/ServiceReportsPage/components/CreateServiceReport.vue');
const EditServiceReport = () => import('../views/ServiceReportsPage/components/EditServiceReport.vue');
const DeleteServiceReport = () => import('../views/ServiceReportsPage/components/DeleteServiceReport.vue');

export const serviceReportsRoutes = [
  { path: '/service-reports', component: ServiceReports, children: [
    { path: '', component: ServiceReportsList, name: listRouteNames.serviceReport, beforeEnter: validateUser },
    { path: 'create', component: CreateServiceReport, name: createRouteNames.serviceReport, beforeEnter: validateUser },
    { path: 'details/:id', component: ServiceReportDetails, name: detailsRouteNames.serviceReport, beforeEnter: validateUser },
    { path: 'edit/:id', component: EditServiceReport, name: editRouteNames.serviceReport, beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteServiceReport, name: deleteRouteNames.serviceReport, beforeEnter: validateUser },
  ] },
];
