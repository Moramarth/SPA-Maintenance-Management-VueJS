import { validateUser } from '../helpers/authValidation';
import { detailsRouteNames, editRouteNames, listRouteNames } from './routeNames';

const Companies = () => import('../views/CompaniesPage/Companies.vue');
const CompaniesList = () => import('../views/CompaniesPage/components/CompaniesList.vue');
const CompanyDetails = () => import('../views/CompaniesPage/components/CompanyDetails.vue');
const EditCompany = () => import('../views/CompaniesPage/components/EditCompany.vue');

export const companiesRoutes = [
  { path: '/partners', component: Companies, children: [
    { path: '', component: CompaniesList, name: listRouteNames.company, beforeEnter: validateUser },
    { path: 'details/:id', component: CompanyDetails, name: detailsRouteNames.company, beforeEnter: validateUser },
    { path: 'edit/:id', component: EditCompany, name: editRouteNames.company, beforeEnter: validateUser },
  ] },
];
