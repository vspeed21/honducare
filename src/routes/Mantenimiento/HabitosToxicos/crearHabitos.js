import express from 'express';

import crearHTController from '../../../controllers/Mantenimiento/HabitosToxicos/crearHTController.js';
const router = express.Router();
// Ruta para crear una nuevo Habito Toxico
router.post('/', crearHTController.createDescripcionHabitos);

export default router;