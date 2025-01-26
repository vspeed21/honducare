import express from 'express';
const router = express.Router();
import HTController from '../../../Controllers/Mantenimiento/HabitosToxicos/actualizarHTController.js';

// Ruta para actualizar un hábito tóxico
router.put('/:id', HTController.updateDescripcionHabitos);

export default router;