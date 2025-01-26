import express from 'express';
import { getDianosticoByPaciente, guardarDiagnostico } from '../controllers/diagnosticoControlador.js';
const router = express.Router();

// Ruta POST para crear un nuevo usuario
router.post('/', guardarDiagnostico);
router.get('/:id', getDianosticoByPaciente);

export default router;
