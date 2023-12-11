import ServiceReports from '../views/ServiceReportsPage/ServiceReports.vue';
import ServiceReportList from '../views/ServiceReportsPage/components/ServiceReportList.vue';
import ServiceReportDetails from '../views/ServiceReportsPage/components/ServiceReportDetails.vue';
import CreateServiceReport from '../views/ServiceReportsPage/components/CreateServiceReport.vue';
import EditServiceReport from '../views/ServiceReportsPage/components/EditServiceReport.vue';
import DeleteServiceReport from '../views/ServiceReportsPage/components/DeleteServiceReport.vue';
import { validateUser } from '../helpers/authValidation';

export const serviceReportsRoutes = [
  { path: '/service-reports', component: ServiceReports,children: [
      { path: '', component: ServiceReportList, name: 'show-all-service-reports' },
      { path: 'create', component: CreateServiceReport, name: 'create-service-report', beforeEnter: validateUser },
      { path: 'details/:id', component: ServiceReportDetails, name: 'service-report-details' },
      { path: 'edit/:id', component: EditServiceReport, name: 'edit-service-report', beforeEnter: validateUser },
      { path: 'delete/:id', component: DeleteServiceReport, name: 'delete-service-report', beforeEnter: validateUser },
    ] },
];
