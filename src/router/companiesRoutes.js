import Companies from '../views/CompaniesPage/Companies.vue';
import CompaniesList from '../views/CompaniesPage/components/CompaniesList.vue';
import CompanyDetails from '../views/CompaniesPage/components/CompanyDetails.vue';

export const companiesRoutes = [
  { path: '/partners', component: Companies, children: [
    { path: '', component: CompaniesList, name: 'show-all-companies' },
    { path: 'details/:id', component: CompanyDetails, name: 'company-details' },
  ] },

];
