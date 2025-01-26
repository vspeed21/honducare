// Importar las dependencias necesarias
import express from 'express';
const router = express.Router();
import eliminarcitaControlador from '../../controllers/Citas/eliminarCitaControlador.js';

// Ruta para eliminar una cita
router.delete('/:id_cita', eliminarcitaControlador.eliminarCita);

export default router;
