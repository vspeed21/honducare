import express from 'express';
const router = express.Router();
import patologiaController from '../../../Controllers/Mantenimiento/Patologias/ObtenerPatologiaControlador.js';

// Rutas para obtener patologías
router.get('/patologias', patologiaController.obtenerPatologias);
router.get('/:id_patologia', patologiaController.obtenerPatologia);

export default router;