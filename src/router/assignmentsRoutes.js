import { validateUser } from '../helpers/authValidation';

const Assignments = () => import('../views/AssignmentsPage/Assignments.vue');
const AssignmentsList = () => import('../views/AssignmentsPage/components/AssignmentsList.vue');
const AssignmentDetails = () => import('../views/AssignmentsPage/components/AssignmentDetails.vue');
const CreateAssignment = () => import('../views/AssignmentsPage/components/CreateAssignment.vue');
const EditAssignment = () => import('../views/AssignmentsPage/components/EditAssignment.vue');
const DeleteAssignment = () => import('../views/AssignmentsPage/components/DeleteAssignment.vue');
const AutoAssignStatus = () => import('../views/AssignmentsPage/components/AutoAssignStatus.vue');

export const assignmentsRoutes = [
  { path: '/assignments',component: Assignments,children: [
      { path: '', component: AssignmentsList, name: 'show-all-assignments', beforeEnter: validateUser },
      { path: 'create', component: CreateAssignment, name: 'create-assignment', beforeEnter: validateUser },
      { path: 'details/:id', component: AssignmentDetails, name: 'assignment-details', beforeEnter: validateUser },
      { path: 'edit/:id', component: EditAssignment, name: 'edit-assignment', beforeEnter: validateUser },
      { path: 'delete/:id', component: DeleteAssignment, name: 'delete-assignment', beforeEnter: validateUser },
      { path: 'auto-assign-status/', component: AutoAssignStatus, name: 'auto-assign-status', beforeEnter: validateUser },
    ] },
];
