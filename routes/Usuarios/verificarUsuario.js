import express from 'express';
const router = express.Router();
import verificarUsuario from '../../Controllers/Usuarios/verificarUsuariosControlador.js';

// Ruta POST para verificar si un usuario existe
router.post('', verificarUsuario);

export default router;

