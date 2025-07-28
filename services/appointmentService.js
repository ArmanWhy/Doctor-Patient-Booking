import { Appointment } from "../models/appointmentModel.js";
import { Doctor } from "../models/doctorModel.js";

export const createAppointment = async ({ doctor, patient, date, reason }) => {
  return await Appointment.create({ doctor, patient, date, reason });
};


export const getAppointmentsByDoctor = async (doctorId, { page, limit }) => {
  return await Appointment.find({ doctor: doctorId })
    .populate('patient', 'name email')
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getAppointmentsByPatient = async (patientId, { page, limit }) => {
  return await Appointment.find({ patient: patientId })
    .populate('doctor', 'name specialization')
    .skip((page - 1) * limit)
    .limit(limit);
};

export const updateAppointment = async (id, data) => {
    return await Appointment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const deleteAppointment = async (id) => {
    return await Appointment.findByIdAndDelete(id);
}