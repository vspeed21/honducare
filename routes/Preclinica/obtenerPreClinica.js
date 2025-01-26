import express from 'express';
const router = express.Router();
import obtenerPreclinicaControlador from '../../Controllers/PreClinica/obtenerPCControlador.js';

router.get('/', obtenerPreclinicaControlador.obtenerPreclinica);

export default router;