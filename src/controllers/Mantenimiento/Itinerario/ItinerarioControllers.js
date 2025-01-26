import Cita from "../../../models/Cita/citaModel.js";
import EstadoCita from "../../../models/Cita/estado_cita.js";
import Paciente from "../../../models/Expediente/PacienteModel.js";


export async function getItinerario(req, res) {
  const { id_doctor, fecha } = req.query;

  const fechaActual = new Date();
  const fechaUTC6 = new Date(fechaActual.setHours(fechaActual.getHours() - 6));

  try {
    const citas = await Cita.findAll({
      where: { id_usuario: id_doctor, id_estado_cita: 1, fecha: fecha ? fecha : fechaUTC6 },
      include: [
        {
          model: EstadoCita,
          as: 'estado',
          attributes: ['descripcion'],
        },
        {
          model: Paciente,
          as: 'paciente',
          attributes: ['nombre_completo'],
        }
      ],
      order: [
        ['hora', 'ASC'],
      ]
    });

    res
      .status(200)
      .json({
        message: "Citas obtenidas correctamente",
        filtro: {
          id_doctor,
          fecha: fecha ? fecha : fechaUTC6,
        },
        citas,
      });
  } catch (error) {
    console.error("Error al obtener la especialidades", error);
    res.status(500).json({ mensaje: "Error al obtener las especialidades", details: error });
  }
}

