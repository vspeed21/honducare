import express from 'express';
const router = express.Router();
import  descripcionController from '../../../Controllers/Mantenimiento/HistoriaGineco/crearHistoriaControlador.js'; // Ajusta la ruta

router.post('/', descripcionController.createDescripcionGinecobstretica);

export default router;