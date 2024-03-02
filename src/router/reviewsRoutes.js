import { validateUser } from '../helpers/authValidation';
import { createRouteNames, deleteRouteNames, detailsRouteNames, editRouteNames, listRouteNames } from './routeNames.js';

const Reviews = () => import('../views/ReviewsPage/Reviews.vue');
const ReviewsList = () => import('../views/ReviewsPage/components/ReviewsList.vue');
const CreateReview = () => import('../views/ReviewsPage/components/CreateReview.vue');
const ReviewDetails = () => import('../views/ReviewsPage/components/ReviewDetails.vue');
const EditReview = () => import('../views/ReviewsPage/components/EditReview.vue');
const DeleteReview = () => import('../views/ReviewsPage/components/DeleteReview.vue');

export const reviewsRoutes = [
  { path: '/reviews', component: Reviews, children: [
    { path: '', component: ReviewsList, name: listRouteNames.review },
    { path: 'create', component: CreateReview, name: createRouteNames.review, beforeEnter: validateUser },
    { path: 'details/:id', component: ReviewDetails, name: detailsRouteNames.review, beforeEnter: validateUser },
    { path: 'edit/:id', component: EditReview, name: editRouteNames.review, beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteReview, name: deleteRouteNames.review, beforeEnter: validateUser },
  ] },
];
