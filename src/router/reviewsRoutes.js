import { validateUser } from '../helpers/authValidation';

const Reviews = () => import('../views/ReviewsPage/Reviews.vue');
const ReviewsList = () => import('../views/ReviewsPage/components/ReviewsList.vue');
const CreateReview = () => import('../views/ReviewsPage/components/CreateReview.vue');
const ReviewDetails = () => import('../views/ReviewsPage/components/ReviewDetails.vue');
const EditReview = () => import('../views/ReviewsPage/components/EditReview.vue');
const DeleteReview = () => import('../views/ReviewsPage/components/DeleteReview.vue');

export const reviewsRoutes = [
  { path: '/reviews', component: Reviews, children: [
    { path: '', component: ReviewsList, name: 'show-all-reviews' },
    { path: 'create', component: CreateReview, name: 'create-review', beforeEnter: validateUser },
    { path: 'details/:id', component: ReviewDetails, name: 'review-details', beforeEnter: validateUser },
    { path: 'edit/:id', component: EditReview, name: 'edit-review', beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteReview, name: 'delete-review', beforeEnter: validateUser },
  ] },
];
