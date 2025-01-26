import express from 'express';

import estadoCivilController from '../../../Controllers/Mantenimiento/EstadoCivil/obtenerEstadoCivilControlador.js';
const router = express.Router();
router.get('/estadosCivil', estadoCivilController.getAllEstadosCiviles);
router.get('/:id_estadosCivil', estadoCivilController.getEstadoCivilById);

export default router;