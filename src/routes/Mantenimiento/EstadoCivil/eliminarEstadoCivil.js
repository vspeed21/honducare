import express from 'express';
const router = express.Router();
import deleteEstadoCivil from '../../../Controllers/Mantenimiento/EstadoCivil/eliminarEstadoCivilControlador.js'; // Ajusta la ruta

router.delete('/:id', deleteEstadoCivil);

export default router;