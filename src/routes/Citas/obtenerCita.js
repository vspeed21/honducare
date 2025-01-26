// Importar las dependencias necesarias
import express from 'express';
const router = express.Router();
//import ontenerCitaControlador from '../../Controllers/Citas/obtenerCitaControlador.js';
import { ontenerCitaControlador, obtenerCitasAgendadasControlador } from '../../Controllers/Citas/obtenerCitaControlador.js';

// Ruta para obtener una cita por ID
router.get('/cita/:id_cita', ontenerCitaControlador.obtenerCita);
router.get('/citas', obtenerCitasAgendadasControlador.obtenerCitasAgendadas);



export default router;