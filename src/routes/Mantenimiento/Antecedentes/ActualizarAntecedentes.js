import express from 'express';
import antecedentesController from '../../../controllers/Mantenimiento/Antecedentes/ActualAntecedenteControlador.js';

const router = express.Router();

// Ruta para actualizar un antecedente
router.put('/:id_descripcion_antecedente', antecedentesController.actualizarAntecedente);

export default router;
