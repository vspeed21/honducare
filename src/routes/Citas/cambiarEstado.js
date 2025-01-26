// Importar las dependencias necesarias
import express from 'express';
const router = express.Router();
import cambiarEstadoNoPresentado from '../../controllers/Citas/cambiarEstadoControlador.js';

// Ruta para actualizar una cita
router.put('/:id_cita', cambiarEstadoNoPresentado);

export default router;