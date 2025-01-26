import express from 'express';
const router = express.Router();
import patologiaController from '../../../controllers/Mantenimiento/Patologias/patologiasControlador.js';

// Ruta para crear una nueva patología
router.post('/', patologiaController.crearPatologia);

export default router;