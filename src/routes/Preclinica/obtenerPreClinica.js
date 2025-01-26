import express from 'express';
const router = express.Router();
import obtenerPreclinicaControlador from '../../controllers/PreClinica/obtenerPCControlador.js';

router.get('/', obtenerPreclinicaControlador.obtenerPreclinica);

export default router;