import express from 'express';
const router = express.Router();
import crearUsuario from '../../controllers/Usuarios/crearUsuarioControlador.js';

import checkAuth from '../../middleware/checkAuth.js';

// Ruta POST para crear un nuevo usuario
router.post('', checkAuth, crearUsuario);

export default router;
