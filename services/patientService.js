import { Patient } from '../models/Patient.js';

export const createPatientService = async (data) => {
  const existing = await Patient.findOne({ email: data.email });
  if (existing) throw new Error('Patient already exists with this email');

  const patient = new Patient(data);
  return await patient.save();
};

export const getAllPatientsService = async (page = 1, limit = 10, search = '') => {
  const skip = (page - 1) * limit;

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }
    : {};

  const [patients, total] = await Promise.all([
    Patient.find(query).skip(skip).limit(limit),
    Patient.countDocuments(query)
  ]);

  return {
    patients,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    totalRecords: total
  };
};


export const getPatientByIdService = async (id) => {
  const patient = await Patient.findById(id);
  if (!patient) throw new Error('Patient not found');
  return patient;
};

export const updatePatientService = async (id, updateData) => {
  const updated = await Patient.findByIdAndUpdate(id, updateData, { new: true });
  if (!updated) throw new Error('Patient not found');
  return updated;
};

export const deletePatientService = async (id) => {
  const deleted = await Patient.findByIdAndDelete(id);
  if (!deleted) throw new Error('Patient not found');
  return deleted;
};
