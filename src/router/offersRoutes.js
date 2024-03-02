import { validateUser } from '../helpers/authValidation';
import { createRouteNames, deleteRouteNames, detailsRouteNames, editRouteNames, listRouteNames } from './routeNames';

const Offers = () => import('../views/OffersPage/Offers.vue');
const OffersList = () => import('../views/OffersPage/components/OffersList.vue');
const CreateOffer = () => import('../views/OffersPage/components/CreateOffer.vue');
const OfferDetails = () => import('../views/OffersPage/components/OfferDetails.vue');
const EditOffer = () => import('../views/OffersPage/components/EditOffer.vue');
const DeleteOffer = () => import('../views/OffersPage/components/DeleteOffer.vue');

export const offersRoutes = [
  { path: '/offers', component: Offers, children: [
    { path: '', component: OffersList, name: listRouteNames.offer, beforeEnter: validateUser },
    { path: 'create', component: CreateOffer, name: createRouteNames.offer, beforeEnter: validateUser },
    { path: 'details/:id', component: OfferDetails, name: detailsRouteNames.offer, beforeEnter: validateUser },
    { path: 'edit/:id', component: EditOffer, name: editRouteNames.offer, beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteOffer, name: deleteRouteNames.offer, beforeEnter: validateUser },
  ] },
];
