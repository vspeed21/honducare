// Importar las dependencias necesarias
import express from 'express';
import crearexpedienteController from '../controllers/Expediente/crearExpedienteController.js'; // Cambiar a import

const router = express.Router();

// Ruta principal para crear un expediente
router.post('/expediente', crearexpedienteController.crearExpediente);

export default router;

