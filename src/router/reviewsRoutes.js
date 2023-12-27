import Reviews from '../views/ReviewsPage/Reviews.vue';
import ReviewsList from '../views/ReviewsPage/components/ReviewsList.vue';
import CreateReview from '../views/ReviewsPage/components/CreateReview.vue';
import ReviewDetails from '../views/ReviewsPage/components/ReviewDetails.vue';
import EditReview from '../views/ReviewsPage/components/EditReview.vue';
import DeleteReview from '../views/ReviewsPage/components/DeleteReview.vue';
import { validateUser } from '../helpers/authValidation';

export const reviewsRoutes = [
  { path: '/reviews', component: Reviews,children: [
      { path: '', component: ReviewsList, name: 'show-all-reviews' },
      { path: 'create', component: CreateReview, name: 'create-review', beforeEnter: validateUser },
      { path: 'details/:id', component: ReviewDetails, name: 'review-details', beforeEnter: validateUser },
      { path: 'edit/:id', component: EditReview, name: 'edit-review', beforeEnter: validateUser },
      { path: 'delete/:id', component: DeleteReview, name: 'delete-review', beforeEnter: validateUser },
    ] },

];
