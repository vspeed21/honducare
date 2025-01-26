import express from 'express';
import { getItinerario } from '../../../controllers/Mantenimiento/Itinerario/Itinerariocontrollers.js';

const router = express.Router();

router.get('/', getItinerario);

export default router;
