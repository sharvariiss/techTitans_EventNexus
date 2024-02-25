import { Router } from 'express';
import { CreateInstitute, DeleteInstitute, GetInstitute, UpdateInstitute } from '../controllers/institute';
import { CreateRoles, DeleteRoles, GetRoles } from '../controllers/roles';
import { CreateDepartments, DeleteDepartments, GetDepartments } from '../controllers/departments';
import { CreateEvent, DeleteEvent, GetEvent } from '../controllers/event';
import { CreatePositions, DeletePositions, GetPositions } from '../controllers/positions';
import { CreateVenue, DeleteVenue, GetVenue } from '../controllers/venue';
import { CreateUser, DeleteUser, GetUser, UpdateUser } from '../controllers/user';
import { CreateRolesDepartmentMapping, DeleteRolesDepartmentMapping, GetRolesDepartmentMapping } from '../controllers/role_department';
import { CreateVenueManagement, DeleteVenueManagement, GetVenueManagement } from '../controllers/venueManagement';
import { CreateCommitteeHead, GetCommitteeHead, UpdateCommitteeHead } from '../controllers/committee_head';
import { CreateCommittee, GetCommittee } from '../controllers/committee';
import { CreateEventCategory, DeleteEventCategory, GetEventCategory } from '../controllers/event_category';
import { CreateFeedBack, DeleteFeedback, GetFeedback } from '../controllers/feedback';
import { CreateEventRegistration, GetEventRegistration } from '../controllers/eventRegistration';
import { CreateStatus, GetStatus } from '../controllers/status';
import Login from '../auth/login';
import Logout from '../auth/logout';
import ResetPassword from '../auth/resetPassword';
import ResetPasswordVerify from '../auth/resetPasswordVerify';
import AuthCheck from '../auth/authCheck';



const router = Router();

router.get('/',(req,res)=>{
    console.log("Hello");    
    return res.json({message:"Hello World"});
});

router.post('/api/create-Institute', CreateInstitute);
router.get('/api/get-Institute', GetInstitute);
router.put('/api/update-Institute', UpdateInstitute);
router.delete('/api/delete-Institute', DeleteInstitute);

router.post('/api/create-roles',CreateRoles);
router.get('/api/get-roles',GetRoles);
router.delete('/api/delete-roles',DeleteRoles);


router.post('/api/create-department',CreateDepartments);
router.get('/api/get-department',GetDepartments);
router.delete('/api/delete-department',DeleteDepartments);


router.post('/api/create-event',CreateEvent);
router.get('/api/get-event',GetEvent);
router.delete('/api/delete-event',DeleteEvent);

router.post('/api/create-event-category',CreateEventCategory);
router.get('/api/get-event',GetEventCategory);
router.delete('/api/delete-event',DeleteEventCategory);


router.post('/api/create-position',CreatePositions);
router.get('/api/get-position',GetPositions);
router.delete('/api/delete-position',DeletePositions);


router.post('/api/create-venue',CreateVenue);
router.get('/api/get-venue',GetVenue);
router.delete('/api/delete-venue',DeleteVenue);

router.post('/api/create-committee', CreateCommittee);
router.get("/api/get-committee", GetCommittee);

router.post('/api/create-committee_head', CreateCommitteeHead);
router.get('/api/get-committee_head', GetCommitteeHead);
router.put('/api/update-committee_head', UpdateCommitteeHead);

router.post('/api/create-user', CreateUser);
router.get('/api/get-user', GetUser);
router.put('/api/update-user', UpdateUser);
router.delete('/api/delete-user', DeleteUser);


router.post('/api/create-role-department-mapping', CreateRolesDepartmentMapping);
router.get('/api/get-role-department-mapping', GetRolesDepartmentMapping);
router.delete('/api/delete-role-department-mapping', DeleteRolesDepartmentMapping);


router.post('/api/create-venueManagement',CreateVenueManagement);
router.get('/api/get-venueManagement',GetVenueManagement);
router.delete('/api/delete-venueManagement',DeleteVenueManagement);

router.post('/api/create-feedback',CreateFeedBack);
router.get('/api/get-feedback',GetFeedback);
router.delete('/api/delete-feedback',DeleteFeedback);

router.post('/api/create-event-registration',CreateEventRegistration);
router.get('/api/get-event-registration',GetEventRegistration);

router.post('/api/create-status',CreateStatus);
router.get('/api/get-status',GetStatus);

// Login route
router.get('/api/login', Login);

// Adding authentication middleware
// router.use(AuthCheck);

// logout, reset password, reset password verify routes
router.get('/api/logout', Logout);
router.get('/api/resetPassword', ResetPassword);
router.get('/api/resetPasswordVerify', ResetPasswordVerify);




export default router;