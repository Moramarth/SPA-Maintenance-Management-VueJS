import { validateUser } from '../helpers/authValidation';

const Profile = () => import('../views/ProfilePage/Profile.vue');
const ProfileDetails = () => import('../views/ProfilePage/components/ProfileDetails.vue');
const EditProfile = () => import('../views/ProfilePage/components/EditProfile.vue');

export const profileRoutes = [
  { path: '/profile/:id', component: Profile, children: [
    { path: '', component: ProfileDetails, name: 'profile-details', beforeEnter: validateUser },
    { path: 'edit', component: EditProfile, name: 'edit-profile', beforeEnter: validateUser },
  ] },
];
