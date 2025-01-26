import express from 'express'
const router = express.Router();
import rolesController from '../../Controllers/Roles/actualizarRolControlador.js';

// Ruta para actualizar un antecedente
router.put('/:id_roles', rolesController.actualizarRol);

export default router;