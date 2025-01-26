import Cita from '../../models/Cita/citaModel.js';
import Paciente from '../../models/Expediente/PacienteModel.js';
import EstadoCita from '../../models/Cita/estado_cita.js';

import { Op } from 'sequelize';
import moment from 'moment';
import Usuario from '../../models/Usuario/usuarioModel.js';


async function obtenerCitasHoy(req, res) {
  const { id_estado_cita, id_doctor } = req.query;

  try {
    // Obtener la fecha actual en el formato adecuado (YYYY-MM-DD)
    const fechaHoy = moment().format("YYYY-MM-DD");

    const whereAdmin = {
      fecha: {
        [Op.eq]: fechaHoy, // Filtrar las citas donde la fecha es igual a hoy
      },
      id_estado_cita: id_estado_cita ? id_estado_cita : 1, // Solo citas que ya hayan hecho la preclinica - en la url debera de venir 3
    }

    const whereDoctor = {
      fecha: {
        [Op.eq]: fechaHoy, // Filtrar las citas donde la fecha es igual a hoy
      },
      id_estado_cita: id_estado_cita, // Solo citas que ya hayan hecho la preclinica - en la url debera de venir 3
      id_usuario: id_doctor,
    }

    // Consultar las citas para hoy
    const citasHoy = await Cita.findAll({
      where: typeof id_doctor == undefined ? whereDoctor : whereAdmin,
      include: [
        {
          model: Paciente, // Relación con el modelo Paciente
          as: "paciente",
          attributes: [
            "id_paciente",
            "nombre_completo",
            "telefono",
            "numero_identidad",
          ],
        },
        {
          model: EstadoCita, // Relación con EstadoCita
          as: "estado",
          attributes: ["id_estado_cita", "descripcion"], // Atributos del estado de la cita
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id_usuario', 'nombre_de_usuario'],
        },
      ],
    });

    // Enviar la respuesta con las citas

    if (citasHoy.length == 0) {
      res.json({ mensaje: 'No hay citas programadas para el dia de hoy. ¡Buen día!' });
      return;
    }

    res.json(citasHoy);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return res.status(500).json({ mensaje: "Error al obtener citas del día", error });
  }
}

export default obtenerCitasHoy;
