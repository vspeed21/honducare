import express from 'express'
const router = express.Router();
import { rolesController } from '../../controllers/Roles/actualizarRolControlador.js';

router.post('/', rolesController.crearRol);

export { router };