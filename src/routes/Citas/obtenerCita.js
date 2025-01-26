// Importar las dependencias necesarias
import express from 'express';
const router = express.Router();
//import ontenerCitaControlador from '../../controllers/Citas/obtenerCitaControlador.js';
import { ontenerCitaControlador, obtenerCitasAgendadasControlador } from '../../controllers/Citas/obtenerCitaControlador.js';

// Ruta para obtener una cita por ID
router.get('/cita/:id_cita', ontenerCitaControlador.obtenerCita);
router.get('/citas', obtenerCitasAgendadasControlador.obtenerCitasAgendadas);



export default router;