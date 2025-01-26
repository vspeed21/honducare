import express from 'express';
const router = express.Router();
import sexoController from '../../../controllers/Mantenimiento/Sexo/EliminarSexoContorlador.js';

// Ruta para eliminar un sexo
router.delete('/:id', sexoController.eliminarSexo);

export default router;