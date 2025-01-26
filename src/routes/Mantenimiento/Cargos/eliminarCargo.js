import express from 'express';
import deleteCargo from '../../../controllers/Mantenimiento/Cargo/eliminarCargoControlador.js';

const router = express.Router();

router.delete('/:id', deleteCargo);

export default router;