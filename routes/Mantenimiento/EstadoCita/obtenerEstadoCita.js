import express from 'express';
import estadoController from '../../../Controllers/Mantenimiento/EstadoCita/obtenerEstadoCitaControlador.js';

const router = express.Router();

router.get('/estados', estadoController.obtenerTodosLosEstados);
router.get('/estados/:id', estadoController.obtenerEstadoPorId);

export default router;