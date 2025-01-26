// actualizarExpediente.js
import express from 'express';
import actualizarExpedienteController from '../Controllers/Expediente/actualizarExpedienteController.js';
const router = express.Router();
router.put('/:id_paciente', actualizarExpedienteController.actualizarExpediente);

export default router;
