import express from 'express';
const router = express.Router();
import antecedentesController from '../../../controllers/Mantenimiento/Antecedentes/antecedenteControlador.js';

router.post('/', antecedentesController.crearAntecedente);


export default router;