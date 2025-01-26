import express from 'express';
const router = express.Router();
const crearUsuarioControlador = import('../../Controllers/Usuarios/crearUsuarioControlador');

// Ruta POST para crear un nuevo usuario
router.post('', crearUsuarioControlador.crearUsuario);

export default router;
