import express from 'express';
const router = express.Router();
import descripcionController from '../../../Controllers/Mantenimiento/HistoriaGineco/obtenerHistoriaControlador.js';

router.get('/descripciones', descripcionController.getAllDescripciones);
router.get('/:id_gineco', descripcionController.getDescripcionById);

export default router;
