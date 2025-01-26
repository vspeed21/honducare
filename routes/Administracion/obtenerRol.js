import express from 'express';
const router = express.Router();
const rolesController = import('../../Controllers/Roles/obtenerRolControlador.js');

// Ruta para obtener todos los antecedentes
router.get('/rol', rolesController.obtenerTodosLosRoles);

// Ruta para obtener un antecedente específico
router.get('/:id', rolesController.obtenerRol);

module.exports = router;