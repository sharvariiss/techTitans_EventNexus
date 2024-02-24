import { Router } from 'express';
import { CreateInstitute, DeleteInstitute, GetInstitute, UpdateInstitute } from '../controllers/institute';
import { Create_Roles, Delete_Roles, Get_Roles } from '../controllers/roles';
import { Create_Departments, Delete_Departments, Get_Departments } from '../controllers/departments';
import { Create_Event_Category, Delete_Event_Category, Get_Event_Category } from '../controllers/event_category';
import { Create_Positions, Delete_Positions, Get_Positions } from '../controllers/positions';
import { Create_Venue, Delete_Venue, Get_Venue } from '../controllers/venue';
import { CreateCommittee, GetCommittee, UpdateCommittee } from '../controllers/editCommittee';



const router = Router();

router.get('/',(req,res)=>{
    console.log("Hello");    
    return res.json({message:"Hello World"});
});

router.post('/api/create-Institute', CreateInstitute);
router.get('/api/get-Institute', GetInstitute);
router.put('/api/update-Institute', UpdateInstitute);
router.delete('/api/delete-Institute', DeleteInstitute);

router.post('/api/create-roles',Create_Roles);
router.get('/api/get-roles',Get_Roles);
router.delete('/api/delete-roles',Delete_Roles);


router.post('/api/create-department',Create_Departments);
router.get('/api/get-department',Get_Departments);
router.delete('/api/delete-department',Delete_Departments);


router.post('/api/create-event-category',Create_Event_Category);
router.get('/api/get-event-category',Get_Event_Category);
router.delete('/api/delete-event-category',Delete_Event_Category);


router.post('/api/create-position',Create_Positions);
router.get('/api/get-position',Get_Positions);
router.delete('/api/delete-position',Delete_Positions);


router.post('/api/create-venue',Create_Venue);
router.get('/api/get-venue',Get_Venue);
router.delete('/api/delete-venue',Delete_Venue);

router.post('/api/create-committee', CreateCommittee);
router.get('/api/get-committee', GetCommittee);
router.put('/api/update-committee', UpdateCommittee);



export default router;