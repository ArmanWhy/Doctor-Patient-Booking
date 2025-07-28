import express from 'express';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from '../controllers/patientController.js';

const router = express.Router();

router.post('/', createPatient);
router.get('/', getAllPatients); // supports ?page=1&limit=10
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;
