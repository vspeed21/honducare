import express from 'express';
import cargoController from '../../../controllers/Mantenimiento/Cargo/actualizarCargoControlador.js';

const router = express.Router();

router.put('/:id', cargoController.updateCargo);

export default router;