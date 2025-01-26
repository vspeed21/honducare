import express from 'express';

import estadoCivilController from '../../../controllers/Mantenimiento/EstadoCivil/actualizarEstadoCivilControlador.js'; // Ajusta la ruta

const router = express.Router();
router.put('/:id', estadoCivilController.actualizarEstadoCivil);

export default router;