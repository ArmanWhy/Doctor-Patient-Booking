import {
  createPatientService,
  getAllPatientsService,
  getPatientByIdService,
  updatePatientService,
  deletePatientService
} from '../services/patientService.js';
import { Patient } from '../models/Patient.js';

export const createPatient = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const patients = await Patient.insertMany(data);
    res.status(201).json({ message: 'Patient created successfully', data: patients });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create patient', error: error.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const result = await getAllPatientsService(page, limit, search);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPatientById = async (req, res) => {
  try {
    const patient = await getPatientByIdService(req.params.id);
    res.status(200).json({ message: 'Patient fetched successfully', patient });
  } catch (error) {
    res.status(404).json({ message: 'Patient not found', error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const updated = await updatePatientService(req.params.id, req.body);
    res.status(200).json({ message: 'Patient updated successfully', patient: updated });
  } catch (error) {
    res.status(404).json({ message: 'Patient not found', error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    await deletePatientService(req.params.id);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Patient not found', error: error.message });
  }
};
