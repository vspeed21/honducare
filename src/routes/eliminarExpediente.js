// eliminarExpediente.js
import express from 'express';

import eliminarExpedienteController from '../controllers/Expediente/eliminarExpedienteController.js';

const router = express.Router();

router.delete('/:id_paciente', eliminarExpedienteController.eliminarExpediente);

export default router;
