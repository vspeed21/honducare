import express from 'express';
const router = express.Router();
import ocupacionController from '../../../controllers/Mantenimiento/Ocupaciones/eliminarOcupacionControlador.js';

// Ruta para eliminar una ocupación
router.delete('/:id_ocupacion', ocupacionController.eliminarOcupacion);

export default router;