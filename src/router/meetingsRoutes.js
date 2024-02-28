import { validateUser } from '../helpers/authValidation';

const Meetings = () => import('../views/MeetingsPage/Meetings.vue');
const MeetingsList = () => import('../views/MeetingsPage/components/MeetingsList.vue');
const CreateMeeting = () => import('../views/MeetingsPage/components/CreateMeeting.vue');
const MeetingDetails = () => import('../views/MeetingsPage/components/MeetingDetails.vue');
const EditMeeting = () => import('../views/MeetingsPage/components/EditMeeting.vue');
const DeleteMeeting = () => import('../views/MeetingsPage/components/DeleteMeeting.vue');

export const meetingsRoutes = [
  { path: '/meetings', component: Meetings, children: [
    { path: '', component: MeetingsList, name: 'show-all-meetings', beforeEnter: validateUser },
    { path: 'create', component: CreateMeeting, name: 'create-meeting', beforeEnter: validateUser },
    { path: 'details/:id', component: MeetingDetails, name: 'meeting-details', beforeEnter: validateUser },
    { path: 'edit/:id', component: EditMeeting, name: 'edit-meeting', beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteMeeting, name: 'delete-meeting', beforeEnter: validateUser },
  ] },
];
