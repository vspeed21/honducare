import express from 'express';
const router = express.Router();
import HTController from '../../../controllers/Mantenimiento/HabitosToxicos/obtenerHTController.js';

// Rutas para obtener habitos
router.get('/habitos', HTController.getAllHabitosToxicos);
router.get('/:id_toxico', HTController.getHabitoToxicoById);

export default router;