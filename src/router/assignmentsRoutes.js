import { validateUser } from '../helpers/authValidation';
import { createRouteNames, deleteRouteNames, detailsRouteNames, editRouteNames, listRouteNames, otherRouteNames } from './routeNames';

const Assignments = () => import('../views/AssignmentsPage/Assignments.vue');
const AssignmentsList = () => import('../views/AssignmentsPage/components/AssignmentsList.vue');
const AssignmentDetails = () => import('../views/AssignmentsPage/components/AssignmentDetails.vue');
const CreateAssignment = () => import('../views/AssignmentsPage/components/CreateAssignment.vue');
const EditAssignment = () => import('../views/AssignmentsPage/components/EditAssignment.vue');
const DeleteAssignment = () => import('../views/AssignmentsPage/components/DeleteAssignment.vue');
const AutoAssignStatus = () => import('../views/AssignmentsPage/components/AutoAssignStatus.vue');

export const assignmentsRoutes = [
  { path: '/assignments', component: Assignments, children: [
    { path: '', component: AssignmentsList, name: listRouteNames.assignment, beforeEnter: validateUser },
    { path: 'create', component: CreateAssignment, name: createRouteNames.assignment, beforeEnter: validateUser },
    { path: 'details/:id', component: AssignmentDetails, name: detailsRouteNames.assignment, beforeEnter: validateUser },
    { path: 'edit/:id', component: EditAssignment, name: editRouteNames.assignment, beforeEnter: validateUser },
    { path: 'delete/:id', component: DeleteAssignment, name: deleteRouteNames.assignment, beforeEnter: validateUser },
    { path: 'auto-assign-status/', component: AutoAssignStatus, name: otherRouteNames.autoAssignStatus, beforeEnter: validateUser },
  ] },
];
