import Profile from '../views/ProfilePage/Profile.vue';
import ProfileDetails from '../views/ProfilePage/components/ProfileDetails.vue';
import EditProfile from '../views/ProfilePage/components/EditProfile.vue';
import { validateUser } from '../helpers/authValidation';

export const profileRoutes = [
  { path: '/profile/:id',component: Profile,
children: [
      { path: '', component: ProfileDetails, name: 'profile-details', beforeEnter: validateUser },
      { path: 'edit', component: EditProfile, name: 'edit-profile', beforeEnter: validateUser },
    ] },

];
