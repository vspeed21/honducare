import express from 'express';
const router = express.Router();
import ocupacionController from '../../../controllers/Mantenimiento/Ocupaciones/actualizarOcuapacionControlador.js';

// Ruta para actualizar una ocupación
router.put('/:id_ocupacion', ocupacionController.actualizarOcupacion);

export default router;