import express from 'express';
import { getAllCargos, getCargoById } from '../../../controllers/Mantenimiento/Cargo/obtenerCargo.js';

const router = express.Router();

router.get('/cargos', getAllCargos);
router.get('/cargos/:id', getCargoById);

export default router;