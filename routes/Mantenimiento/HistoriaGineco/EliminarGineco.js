import express from 'express';
const router = express.Router();
import descripcionController from '../../../Controllers/Mantenimiento/HistoriaGineco/eliminarHistoriaControlador.js';

router.delete('/:id', descripcionController.deleteDescripcionGinecobstretica);

export default router;