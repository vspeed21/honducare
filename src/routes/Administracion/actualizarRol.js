import express from 'express'
const router = express.Router();
import rolesController from '../../controllers/Roles/actualizarRolControlador.js';

// Ruta para actualizar un antecedente
router.put('/:id_roles', rolesController.actualizarRol);

export default router;