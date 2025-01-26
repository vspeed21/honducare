import express from 'express';
const router = express.Router();
import sexoControlador from '../../../Controllers/Mantenimiento/Sexo/sexoControlador.js';

// Ruta principal para crear un expediente
router.post('/', sexoControlador.crearSexo);

export default router;