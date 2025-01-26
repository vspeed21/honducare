import express from 'express';
import estadoController from '../../../Controllers/Mantenimiento/EstadoCita/actualizarEstadoCitaControlador.js';

const router = express.Router();

router.put('/:id', estadoController.actualizarEstado);

export default router;