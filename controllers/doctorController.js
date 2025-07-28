import { getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} from "../services/doctorService.js";
import { Doctor } from "../models/doctorModel.js";

export const listDoctors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await getAllDoctors({ page, limit})
        res.status(200).json({ message: 'Doctors fetched successfully', result})
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
}

export const doctorDetails = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await getDoctorById(doctorId);
        if(!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.status(200).json({ message: 'Doctor details fetched successfully', doctor})
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor details', error: error.message });
    }
}

export const createDoctor = async (req, res) => {
    try {
        const doctors = req.body

        if(Array.isArray(doctors)){
            const createdDoctors = await Doctor.insertMany(doctors)
            res.status(201).json({ message: 'Doctors created successfully', doctors: createdDoctors });
        }else{
            const doctor = new Doctor(doctors);
            const savedDoctor = await doctor.save()
            res.status(201).json({ message: 'Doctor created successfully', doctor: savedDoctor });
        }
    } catch (error) {
        console.log('Error creating doctor:', error);
        res.status(500).json({ message: 'Error creating doctor', error: error.message });
    }
}

export const modifyDoctor = async (req, res) => {
    try {
        const doctor = req.params.id;
        const updateDoctor = await updateDoctor(doctor, req.body)

        if(!updateDoctor) {
            return res.status(404).json({ message: 'Doctor not found' })
        }
        res.status(200).json({ message: 'Doctor updated successfully', doctor: updateDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Invalid update data', error: error.message });
    }
}

export const removeDoctor = async (req, res) => {
    try {
        const doctor = req.params.id;
        const deleteDoctor = await deleteDoctor(doctor)
        if(!deleteDoctor){
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully', doctor: deleteDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting doctor', error: error.message });
    }
}