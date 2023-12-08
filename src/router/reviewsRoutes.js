import Reviews from '../views/ComponentContainers/Reviews.vue';

export const reviewsRoutes = [
  { path: '/reviews', component: Reviews, name: 'show-all-reviews', props: { loadAll: true } },
  { path: '/reviews/create', component: Reviews, name: 'create-review', props: { isCreating: true } },
  { path: '/reviews/details/:id', component: Reviews, name: 'review-details' },
  { path: '/reviews/edit/:id', component: Reviews, name: 'edit-review', props: { isEditing: true } },
  { path: '/reviews/delete/:id', component: Reviews, name: 'delete-review', props: { isDeleting: true } },
];
