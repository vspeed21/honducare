import express from 'express';
const router = express.Router();
import deleteEstadoCivil from '../../../controllers/Mantenimiento/EstadoCivil/eliminarEstadoCivilControlador.js'; // Ajusta la ruta

router.delete('/:id', deleteEstadoCivil);

export default router;