import { createAppointment,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    updateAppointment,
    deleteAppointment
} from "../services/appointmentService.js";
import { Appointment } from "../models/appointmentModel.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctor, patient, date, reason, status } = req.body;

    if (!doctor || !patient || !date || !reason || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const appointment = new Appointment({
      doctor,
      patient,
      date,
      reason,
      status
    })

    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'doctor') {
      filter.doctor = req.user.id;
    } else if (req.user.role === 'patient') {
      filter.patient = req.user.id;
    }

    const appointments = await Appointment.find(filter)
      .populate('doctor', 'name specialization')
      .populate('patient', 'name age');

    res.status(200).json({
      message: "Appointments fetched successfully",
      count: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};


export const modifyAppointment = async (req, res) => {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

export const removeAppointment = async (req, res) => {
  try {
    const appointment = await deleteAppointment(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};

// PATCH /appointments/:id/status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Scheduled', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({
      message: 'Appointment status updated successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error: error.message });
  }
};
