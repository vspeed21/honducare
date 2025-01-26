import express from 'express';
const router = express.Router();
import crearpccontrolador from '../../Controllers/PreClinica/crearPCControlador.js';

import checkAuth from '../../middleware/checkAuth.js'

// Ruta principal para crear un expediente
router.post('/preclinica', checkAuth, crearpccontrolador.crearPreclinica);

export default router;