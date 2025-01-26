import express from 'express';
import rolesController from '../../controllers/Roles/actualizarRolControlador.js';

const router = express.Router();

// Rutas para roles
router.post('/rol', rolesController.crearRol);
router.get('/rol/roles', rolesController.obtenerTodosLosRoles);
router.get('/:id_rol', rolesController.obtenerRol);
router.put('/:id_rol', rolesController.actualizarRol);
router.delete('/:id', rolesController.eliminarRol);

export default router;
