import Cita from '../../models/Cita/citaModel.js';
import Paciente from '../../models/Expediente/PacienteModel.js';
import EstadoCita from '../../models/Cita/estado_cita.js';
import Usuario from '../../models/Usuario/usuarioModel.js';

const ontenerCitaControlador = {
  obtenerCita: async (req, res) => {
    const { id_cita } = req.params;

    try {
      // Usamos Sequelize para buscar la cita e incluir el nombre del paciente
      const cita = await Cita.findOne({
        where: { id_cita },
        include: [
          {
            model: Paciente,
            as: "paciente", // Nombre de la asociación definida en el modelo
            attributes: ["nombre_completo", "telefono", "numero_identidad"], // Especificamos que solo queremos el nombre
          },
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['id_usuario', 'nombre_de_usuario'],
          },
        ],
      });

      if (!cita) {
        return res.status(404).json({ error: "Cita no encontrada" });
      }
      res.status(200).json(cita);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la cita" });
    }
  }
};

const obtenerCitasAgendadasControlador = {
  obtenerCitasAgendadas: async (req, res) => {
    try {
      const citasAgendadas = await Cita.findAll({
        where: { "$estado.descripcion$": "agendada" },
        include: [
          {
            model: Paciente,
            as: "paciente",
            attributes: ["nombre_completo", "telefono", "numero_identidad"], // Campos deseados del paciente
          },
          {
            model: EstadoCita,
            as: "estado",
            attributes: ["descripcion"],
          },
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['id_usuario', 'nombre_de_usuario'],
          },
        ],
        order: [
          ["fecha", "ASC"],
          ["hora", "ASC"],
        ], // Orden por fecha y hora
      });

      if (citasAgendadas.length > 0) {
        res.status(200).json(citasAgendadas);
      } else {
        res.status(404).json({ mensaje: "No hay citas agendadas actualmente." });
      }
    } catch (error) {
      console.error("Error al obtener las citas agendadas:", error);
      res.status(500).json({ mensaje: "Error al obtener las citas agendadas.", error });
    }
  }
};

export { ontenerCitaControlador, obtenerCitasAgendadasControlador };
