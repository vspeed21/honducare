import express from 'express';
const router = express.Router();
import patologiaController from '../../../Controllers/Mantenimiento/Patologias/EliminarPatologiaControlador.js';

// Ruta para eliminar una patología
router.delete('/:id_patologia', patologiaController.eliminarPatologia);

export default router;