import { validateUser } from '../helpers/authValidation';

const Offers = () => import('../views/OffersPage/Offers.vue');
const OffersList = () => import('../views/OffersPage/components/OffersList.vue');
const CreateOffer = () => import('../views/OffersPage/components/CreateOffer.vue');
const OfferDetails = () => import('../views/OffersPage/components/OfferDetails.vue');
const EditOffer = () => import('../views/OffersPage/components/EditOffer.vue');
const DeleteOffer = () => import('../views/OffersPage/components/DeleteOffer.vue');

export const offersRoutes = [
  { path: '/offers', component: Offers, children: [
    { path: '', component: OffersList, name: 'show-all-offers', beforeEnter: validateUser },
    { path: 'create', component: CreateOffer, name: 'create-offer', beforeEnter: validateUser },
    { path: 'details/:id', component: OfferDetails, name: 'offer-details', beforeEnter: validateUser },
    { path: 'edit/:id', component: EditOffer, name: 'edit-offer', beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteOffer, name: 'delete-offer', beforeEnter: validateUser },
  ] },
];
