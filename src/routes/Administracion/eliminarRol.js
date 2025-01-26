import express from 'express'
const router = express.Router();
import { rolesController } from '../../controllers/Roles/eliminarRolControlador.js';

// Ruta para eliminar un antecedente
router.delete('/:id', rolesController.eliminarRol);

export { router };