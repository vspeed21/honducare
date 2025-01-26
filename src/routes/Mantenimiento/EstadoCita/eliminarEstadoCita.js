import express from 'express';
import estadoController from '../../../Controllers/Mantenimiento/EstadoCita/eliminarEstadoCitaControlador.js';

const router = express.Router();

router.delete('/:id', estadoController.eliminarEstado);

export default router;