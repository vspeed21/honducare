import express from 'express';
const router = express.Router();
import verificarUsuario from '../../controllers/Usuarios/verificarUsuariosControlador.js';

// Ruta POST para verificar si un usuario existe
router.post('', verificarUsuario);

export default router;

