import express from 'express';
import { getBitacora } from '../../../controllers/Mantenimiento/Bitacora/BitacoraControllers.js';

const router = express.Router();

router.get('/', getBitacora);

export default router;