// Importar las dependencias necesarias
import express from 'express';
const router = express.Router();
import crearcitacontrolador from '../../controllers/Citas/crearCitaControlador.js';

import checkAuth from '../../middleware/checkAuth.js';

// Ruta principal para crear un expediente
router.post('/cita', checkAuth, crearcitacontrolador.crearCita);

export default router;