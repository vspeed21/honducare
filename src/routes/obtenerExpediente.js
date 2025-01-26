// obtenerExpediente.js
import express from 'express';
import obtenerExpedienteController from '../Controllers/Expediente/obtenerExpedienteController.js';

const router = express.Router();
// Ruta para obtener el expediente
router.get('/', obtenerExpedienteController.obtenerExpedienteByIdentidad);
router.get('/:id_paciente', obtenerExpedienteController.obtenerExpediente);

export default router;
