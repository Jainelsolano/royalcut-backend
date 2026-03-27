// controllers/appointmentController.js
const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
    try {
        const { nombre, apellido, telefono, hora } = req.body;
        const fecha = new Date().toISOString().split('T')[0];

        const existingAppointment = await Appointment.findOne({ fecha, hora });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: 'Esta hora ya no está disponible'
            });
        }

        const appointment = new Appointment({
            nombre,
            apellido,
            telefono,
            hora,
            fecha
        });

        await appointment.save();

        res.status(201).json({
            success: true,
            data: appointment,
            message: 'Cita agendada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al agendar cita',
            error: error.message
        });
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener citas',
            error: error.message
        });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cita eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar cita',
            error: error.message
        });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    deleteAppointment
};