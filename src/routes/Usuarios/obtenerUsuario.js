import express from 'express';
const router = express.Router();
import usuarioController from '../../Controllers/Usuarios/obtenerUsuarioControlador.js';

// Ruta para obtener todos los antecedentes
router.get('/usuario', usuarioController.obtenerTodosLosUsuarios);
router.get('/buscar-nombre', usuarioController.obtenerUsuarioPorNombre);

// Ruta para obtener un antecedente específico
router.get('/:id_usuario', usuarioController.obtenerUsuario);
router.get('/:correo', usuarioController.obtenerUsuarioEmail);
router.get('/rol/:id_rol', usuarioController.obtenerUsuarioPorRol);

export default router;