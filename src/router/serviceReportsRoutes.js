import { validateUser } from '../helpers/authValidation';

const ServiceReports = () => import('../views/ServiceReportsPage/ServiceReports.vue');
const ServiceReportList = () => import('../views/ServiceReportsPage/components/ServiceReportList.vue');
const ServiceReportDetails = () => import('../views/ServiceReportsPage/components/ServiceReportDetails.vue');
const CreateServiceReport = () => import('../views/ServiceReportsPage/components/CreateServiceReport.vue');
const EditServiceReport = () => import('../views/ServiceReportsPage/components/EditServiceReport.vue');
const DeleteServiceReport = () => import('../views/ServiceReportsPage/components/DeleteServiceReport.vue');

export const serviceReportsRoutes = [
  { path: '/service-reports', component: ServiceReports, children: [
    { path: '', component: ServiceReportList, name: 'show-all-service-reports', beforeEnter: validateUser },
    { path: 'create', component: CreateServiceReport, name: 'create-service-report', beforeEnter: validateUser },
    { path: 'details/:id', component: ServiceReportDetails, name: 'service-report-details', beforeEnter: validateUser },
    { path: 'edit/:id', component: EditServiceReport, name: 'edit-service-report', beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteServiceReport, name: 'delete-service-report', beforeEnter: validateUser },
  ] },
];
