import { validateUser } from '../helpers/authValidation';
import { createRouteNames, deleteRouteNames, detailsRouteNames, editRouteNames, listRouteNames } from './routeNames';

const Meetings = () => import('../views/MeetingsPage/Meetings.vue');
const MeetingsList = () => import('../views/MeetingsPage/components/MeetingsList.vue');
const CreateMeeting = () => import('../views/MeetingsPage/components/CreateMeeting.vue');
const MeetingDetails = () => import('../views/MeetingsPage/components/MeetingDetails.vue');
const EditMeeting = () => import('../views/MeetingsPage/components/EditMeeting.vue');
const DeleteMeeting = () => import('../views/MeetingsPage/components/DeleteMeeting.vue');

export const meetingsRoutes = [
  { path: '/meetings', component: Meetings, children: [
    { path: '', component: MeetingsList, name: listRouteNames.meeting, beforeEnter: validateUser },
    { path: 'create', component: CreateMeeting, name: createRouteNames.meeting, beforeEnter: validateUser },
    { path: 'details/:id', component: MeetingDetails, name: detailsRouteNames.meeting, beforeEnter: validateUser },
    { path: 'edit/:id', component: EditMeeting, name: editRouteNames.meeting, beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteMeeting, name: deleteRouteNames.meeting, beforeEnter: validateUser },
  ] },
];
