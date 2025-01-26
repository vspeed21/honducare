// Importar las dependencias necesarias
import express from 'express';
const router = express.Router();
import obtenerCitasHoy from '../../Controllers/Citas/obtenerCitadelDiaControlador.js';

// Ruta para actualizar una cita
router.get('/today', obtenerCitasHoy);

export default router;