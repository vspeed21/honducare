import express from 'express';
const router = express.Router();
import patologiaController from '../../../Controllers/Mantenimiento/Patologias/ActuaPatologiasControlador.js';

// Ruta para actualizar una patología
router.put('/:id_patologia', patologiaController.actualizarPatologia);

export default router;