import express from 'express';
import { getItinerario } from '../../../controllers/Mantenimiento/Itinerario/ItinerarioControllers.js';

const router = express.Router();

router.get('/', getItinerario);

export default router;
