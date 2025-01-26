import express from 'express';
import { getEstadisticas, getPacientesGeneroYear } from '../../../controllers/Mantenimiento/Estadisticas/estadisticasControllers.js';

const router = express.Router();

router.get('/', getEstadisticas);
router.get('/pacientes-genero', getPacientesGeneroYear);

export default router;