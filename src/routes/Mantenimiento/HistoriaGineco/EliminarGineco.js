import express from 'express';
const router = express.Router();
import descripcionController from '../../../controllers/Mantenimiento/HistoriaGineco/eliminarHistoriaControlador.js';

router.delete('/:id', descripcionController.deleteDescripcionGinecobstretica);

export default router;