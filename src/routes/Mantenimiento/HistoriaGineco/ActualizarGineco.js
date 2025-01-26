import express from 'express';
const router = express.Router();
import descripcionGinecobstreticaController from '../../../controllers/Mantenimiento/HistoriaGineco/actualizarHistoriaControlador.js';

router.put('/:id', descripcionGinecobstreticaController.actualizarDescripcionGinecobstretica);

export default router;
