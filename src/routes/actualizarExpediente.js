// actualizarExpediente.js
import express from 'express';
import actualizarExpedienteController from '../controllers/Expediente/actualizarExpedienteController.js';
const router = express.Router();
router.put('/:id_paciente', actualizarExpedienteController.actualizarExpediente);

export default router;
