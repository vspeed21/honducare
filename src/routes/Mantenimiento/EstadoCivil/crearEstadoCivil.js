import express from 'express';
const router = express.Router();
import createEstadoCivil from '../../../controllers/Mantenimiento/EstadoCivil/crearEstadoCivilControlador.js'; // Ajusta la ruta

router.post('/', createEstadoCivil);

export default router;