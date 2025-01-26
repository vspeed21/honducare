// actualizarPreclinica.js
import express from 'express';
const router = express.Router();
import actualizarPCControlador from '../../Controllers/PreClinica/actualizarPCControlador.js';

import checkAuth from '../../middleware/checkAuth.js';

router.put('/:id_paciente', checkAuth, actualizarPCControlador.actualizarPreclinica);

export default router;
