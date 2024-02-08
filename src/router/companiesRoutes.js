import { validateUser } from '../helpers/authValidation';

const Companies = () => import('../views/CompaniesPage/Companies.vue');
const CompaniesList = () => import('../views/CompaniesPage/components/CompaniesList.vue');
const CompanyDetails = () => import('../views/CompaniesPage/components/CompanyDetails.vue');
const EditCompany = () => import('../views/CompaniesPage/components/EditCompany.vue');

export const companiesRoutes = [
  { path: '/partners', component: Companies, children: [
    { path: '', component: CompaniesList, name: 'show-all-companies', beforeEnter: validateUser },
    { path: 'details/:id', component: CompanyDetails, name: 'company-details', beforeEnter: validateUser },
    { path: 'edit/:id', component: EditCompany, name: 'edit-company', beforeEnter: validateUser },
  ] },
];
