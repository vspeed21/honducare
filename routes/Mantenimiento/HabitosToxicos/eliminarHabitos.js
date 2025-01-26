import express from 'express';
const router = express.Router();
import  habitosToxicosController from '../../../Controllers/Mantenimiento/HabitosToxicos/eliminarHTController.js';

// Ruta para eliminar un hábito tóxico
router.delete('/:id', habitosToxicosController.deleteHabitoToxico);

export default router;