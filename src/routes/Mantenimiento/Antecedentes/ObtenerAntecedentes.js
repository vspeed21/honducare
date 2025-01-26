import express from 'express';
const router = express.Router();
import antecedentesController from '../../../controllers/Mantenimiento/Antecedentes/ObtenerAntecedenteControlador.js';

// Ruta para obtener todos los antecedentes
router.get('/antecedente', antecedentesController.obtenerTodosLosAntecedentes);

// Ruta para obtener un antecedente específico
router.get('/:id', antecedentesController.obtenerAntecedente);

export default router;