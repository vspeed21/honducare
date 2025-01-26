// Importar las dependencias necesarias
import express from 'express';
const router = express.Router();
import historialCitasControlador from '../../controllers/Citas/historialCitasControlador.js';

// Ruta para obtener todas las citas de un paciente
router.get('/historial/:id_paciente', historialCitasControlador.historialcitasPaciente);

export default router;
