import express from 'express';
const router = express.Router();
const crearUsuarioControlador = import('../../controllers/Usuarios/crearUsuarioControlador');

// Ruta POST para crear un nuevo usuario
router.post('', crearUsuarioControlador.crearUsuario);

export default router;
