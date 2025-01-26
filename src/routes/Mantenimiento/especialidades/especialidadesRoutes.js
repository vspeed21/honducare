import express from 'express';
import { createEspecialidad, getEspecialidadById, getEspecialidades, updateEspecialidad } from '../../../Controllers/Mantenimiento/Especialidades/especialidadesControllers.js';
import checkAuth from '../../../middleware/checkAuth.js';

const router = express.Router();


router.post('/', checkAuth, createEspecialidad);
router.get('/', getEspecialidades);
router.get('/:id', getEspecialidadById);
router.put('/:id', checkAuth, updateEspecialidad);

export default router;
