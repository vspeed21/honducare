// Importar las dependencias necesarias
import express from 'express';
const router = express.Router();
import eliminarcitaControlador from '../../Controllers/Citas/eliminarCitaControlador.js';

// Ruta para eliminar una cita
router.delete('/:id_cita', eliminarcitaControlador.eliminarCita);

export default router;
