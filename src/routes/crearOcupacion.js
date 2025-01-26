import express from 'express';
const router = express.Router();
const crearocupacioncontrolador = import('../Controllers/crearOcupacionControlador');

// Ruta principal para crear un expediente
router.post('/ocupacion', crearocupacioncontrolador.crearOcupacion);

export default router;