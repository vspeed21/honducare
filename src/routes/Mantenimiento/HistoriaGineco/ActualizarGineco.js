import express from 'express';
const router = express.Router();
import descripcionGinecobstreticaController from '../../../Controllers/Mantenimiento/HistoriaGineco/actualizarHistoriaControlador.js';

router.put('/:id', descripcionGinecobstreticaController.actualizarDescripcionGinecobstretica);

export default router;
