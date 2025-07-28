import express from 'express';

import { mockAuth } from '../middlewares/mockAuth.js';

import { bookAppointment, 
    getAppointments,
    modifyAppointment,
    removeAppointment,
    updateAppointmentStatus
} from '../controllers/appointmentController.js';

const router = express.Router();

router.use(mockAuth); // Apply mock authentication middleware

router.post('/', bookAppointment);
router.get('/', getAppointments);
router.put('/:id', modifyAppointment);
router.delete('/:id', removeAppointment);
router.patch('/:id/status', updateAppointmentStatus); //PATCH for updating appointment status




export default router;