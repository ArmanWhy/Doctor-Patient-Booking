import express from 'express';

import { 
    createDoctor, 
    listDoctors,
    doctorDetails,
    modifyDoctor,
    removeDoctor 
} from '../controllers/doctorController.js';

const router = express.Router();

// POST /doctors (Single or Bulk)


router.post('/', createDoctor);
router.get('/', listDoctors);
router.get('/:id', doctorDetails);
router.put('/:id', modifyDoctor);
router.delete('/:id', removeDoctor);

export default router;