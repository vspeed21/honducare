import express from 'express';
const router = express.Router();
import ocupacionController from '../../../Controllers/Mantenimiento/Ocupaciones/crearOcupacionControlador.js';

// Ruta para crear una nueva ocupación
router.post('/', ocupacionController.crearOcupacion);

export default router;