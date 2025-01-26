import express from 'express';
const router = express.Router();
import antecedentesController from '../../../Controllers/Mantenimiento/Antecedentes/EliminarAntecedenteControlador.js';

// Ruta para eliminar un antecedente
router.delete('/:id', antecedentesController.eliminarAntecedente);

export default router;