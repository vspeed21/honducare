import express from 'express';
const router = express.Router();
import sexoController from '../../../controllers/Mantenimiento/Sexo/ActualizarSexoControlador.js';

// Ruta para actualizar un sexo
router.put('/:id_sexo', sexoController.actualizarSexo);

export default router;