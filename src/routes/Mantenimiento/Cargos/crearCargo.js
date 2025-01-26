import express from 'express';
const router = express.Router();
import crearCargo from '../../../controllers/Mantenimiento/Cargo/crearCargoControlador.js'; // Ajusta la ruta según tu estructura de carpetas

// Ruta para crear un cargo
router.post('/', crearCargo);

export default router;
