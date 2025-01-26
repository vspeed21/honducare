// eliminarExpediente.js
import express from 'express';
const router = express.Router();
import eliminarPreclinica from '../../controllers/PreClinica/eliminarPCControlador.js';

router.delete('/:id_paciente', eliminarPreclinica.eliminarPreclinica);

export default router;