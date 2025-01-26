import express from 'express';
import estadoController from '../../../controllers/Mantenimiento/EstadoCita/crearEstadoCitaControlador.js';

const router = express.Router();

router.post('/', estadoController.crearEstado);

export default router;