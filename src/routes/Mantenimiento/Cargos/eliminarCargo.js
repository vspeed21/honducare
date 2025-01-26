import express from 'express';
import deleteCargo from '../../../Controllers/Mantenimiento/Cargo/eliminarCargoControlador.js';

const router = express.Router();

router.delete('/:id', deleteCargo);

export default router;