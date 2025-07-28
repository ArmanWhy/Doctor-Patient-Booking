import { Doctor } from "../models/doctorModel.js";

export const getAllDoctors = async ({ page = 1, limit = 10}) => {
    const skip = (page - 1) * limit;
    const total = await Doctor.countDocuments();
    const doctors = await Doctor.find().skip(skip).limit(limit);
    return { total, page, limit, doctors}
}

export const getDoctorById = async (id) => {
    return await Doctor.findById(id);
}


export const updateDoctor = async (id, data) => {
    return await Doctor.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const deleteDoctor = async (id) => {
    return await Doctor.findByIdAndDelete(id);
}