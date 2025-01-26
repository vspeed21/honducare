// Importar las dependencias necesarias
import express from 'express';

import actualizarcitaControlador from '../../controllers/Citas/actualizarCitaControlador.js';

const router = express.Router();
// Ruta para actualizar una cita
router.put('/:id_cita', actualizarcitaControlador.actualizarCita);
router.put('/cancelar/:id_cita', actualizarcitaControlador.cancelarCita);

export default router;
