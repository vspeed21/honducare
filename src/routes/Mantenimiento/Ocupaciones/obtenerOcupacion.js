import express from 'express';
const router = express.Router();
import ocupacionController from '../../../controllers/Mantenimiento/Ocupaciones/obtenerOcupacionControlador.js';

// Ruta para obtener todas las ocupaciones
router.get('/ocupacion', ocupacionController.obtenerTodasLasOcupaciones);

export default router;