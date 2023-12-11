import Companies from '../views/CompaniesPage/Companies.vue';
import CompaniesList from '../views/CompaniesPage/components/CompaniesList.vue';
import CompanyDetails from '../views/CompaniesPage/components/CompanyDetails.vue';
import EditCompany from '../views/CompaniesPage/components/EditCompany.vue';
import { validateUser } from '../helpers/authValidation';

export const companiesRoutes = [
  { path: '/partners', component: Companies, children: [
    { path: '', component: CompaniesList, name: 'show-all-companies' },
    { path: 'details/:id', component: CompanyDetails, name: 'company-details' },
    { path: 'edit/:id', component: EditCompany, name: 'edit-company', beforeEnter: validateUser },
  ] },

];
