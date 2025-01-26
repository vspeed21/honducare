import express from 'express';
const router = express.Router();
const verificarUsuarioControlador = import('../../backend-honduCare/controllers/Usuarios/verificarUsuariosControlador');

// Ruta POST para verificar si un usuario existe
router.post('', verificarUsuarioControlador.verificarUsuario);

export default router;

