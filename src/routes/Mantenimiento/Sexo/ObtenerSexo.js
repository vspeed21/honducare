import express from 'express';
const router = express.Router();
import sexoController from '../../../Controllers/Mantenimiento/Sexo/ObtenerSexoControlador.js';

// Ruta para obtener todos los sexos
router.get('/sexos', sexoController.obtenerTodosLosSexos);

// Ruta para obtener un sexo específico
router.get('/sexos/:id_sexo', sexoController.obtenerSexo);

export default router;