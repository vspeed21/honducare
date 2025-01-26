import express from 'express';
const router = express.Router();
import antecedentesController from '../../../Controllers/Mantenimiento/Antecedentes/antecedenteControlador.js';

router.post('/', antecedentesController.crearAntecedente);


export default router;