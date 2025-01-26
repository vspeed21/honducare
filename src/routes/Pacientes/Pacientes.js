import express from 'express';
const router = express.Router();
import { getPacientes, getPacientesById, crearPaciente, updatePacientes, eliminarPacientes } from '../../controllers/Paciente/PacienteControladores.js';
import checkAuth from '../../middleware/checkAuth.js';

router.post('/', checkAuth, crearPaciente);
router.get('/', getPacientes);
router.get('/:id', getPacientesById);
router.put('/:id', updatePacientes);
router.delete('/:id', eliminarPacientes);

export default router;