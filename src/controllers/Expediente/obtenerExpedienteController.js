// Controlador actualizado para obtener expediente
import Paciente from '../../models/Expediente/PacienteModel.js';
import AntecedentePaciente from '../../models/Expediente/antecedentesPModel.js';
import HistoriaPatologica from '../../models/Expediente/historia_patologica_models.js';
import HabitoToxicoPaciente from '../../models/Expediente/habito_toxico_paciente_Model.js';
import HistoriaGinecoobstetrica from '../../models/Expediente/historia_ginecobstetrica_paciente_Models.js';
import Patologia from '../../models/Mantenimiento/patologiasModel.js';
import Ocupacion from '../../models/Mantenimiento/ocupacionModel.js';
import EstadoCivil from '../../models/Mantenimiento/estado_civilModel.js';
import Sexo from '../../models/Mantenimiento/sexoModel.js';
import DescripcionAntecedente from '../../models/Mantenimiento/descripcion_antecedenteModel.js';
import DescripcionHabitos from '../../models/Mantenimiento/descripcion_habitos_Model.js';
import DescripcionGinecobstretica from '../../models/Mantenimiento/descripcion_ginecobstetrica_Model.js';

const obtenerExpedienteController = {
  obtenerExpediente: async (req, res) => {
    const { id_paciente } = req.params;

    try {
      console.log(`Buscando paciente con ID: ${id_paciente}`);

      // Obtener el paciente
      const paciente = await Paciente.findOne({
        where: { id_paciente },
        include: [
          {
            model: Ocupacion,
            attributes: ['id_ocupacion', 'descripcion'],
          },
          {
            model: EstadoCivil,
            attributes: ['id_estado_civil', 'descripcion'],
          },
          {
            model: Sexo,
            attributes: ['id_sexo', 'descripcion'],
          },
        ],
      });

      if (!paciente) {
        console.log(`Paciente con ID: ${id_paciente} no encontrado`);
        return res.status(404).json({ error: "Paciente no encontrado" });
      }

      console.log("Paciente encontrado:", paciente);

      // Obtener las patologías familiares
      const patologiasFamiliares = await HistoriaPatologica.findAll({
        where: { id_paciente, tipo_historia: "familiar" },
        attributes: ["id_patologia", "parentesco"],
        include: [
          {
            model: Patologia,
            as: 'patologia',
            attributes: ['id_patologia', 'descripcion'],
          },
        ],
      });

      // Obtener las patologías personales
      const patologiasPersonales = await HistoriaPatologica.findAll({
        where: { id_paciente, tipo_historia: "personal" },
        attributes: ["id_patologia", "medicamentos", "dosis", "horario"],
        include: [
          {
            model: Patologia,
            as: 'patologia',
            attributes: ['id_patologia', 'descripcion'],
          },
        ],
      });

      // Obtener los antecedentes
      const antecedentes = await AntecedentePaciente.findAll({
        where: { id_paciente },
        include: [
          {
            model: DescripcionAntecedente,
            attributes: ['id_descripcion_antecedente', 'descripcion'],
          },
        ],
      });

      // Obtener los hábitos tóxicos
      const habitosToxicos = await HabitoToxicoPaciente.findAll({
        where: { id_paciente },
        include: [
          {
            model: DescripcionHabitos,
            attributes: ['id_descripcion_habitos', 'descripcion'],
          },
        ],
      });

      // Obtener la historia ginecoobstétrica
      const historiaGineco = await HistoriaGinecoobstetrica.findAll({
        where: { id_paciente },
        include: [
          {
            model: DescripcionGinecobstretica,
            attributes: ['id_descripcion_ginecoobstetrica', 'descripcion'],
          },
        ],
      });

      // Formatear la respuesta
      const expediente = {
        paciente: paciente.toJSON(), // Convertimos para manipular datos fácilmente
        patologiasFamiliares: patologiasFamiliares.map((p) => ({
          ...p.toJSON(),
          descripcion: p.Patologia?.descripcion || "N/A", // Incluimos descripción si existe
        })),
        patologiasPersonales: patologiasPersonales.map((p) => ({
          ...p.toJSON(),
          descripcion: p.Patologia?.descripcion || "N/A", // Incluimos descripción si existe
        })),
        antecedentes,
        habitosToxicos,
        historiaGineco,
      };

      console.log("Expediente completo:", expediente);

      res.status(200).json(expediente);
    } catch (error) {
      console.error("Error al obtener el expediente:", error);
      res.status(500).json({
        error: "Error al obtener el expediente",
        details: error.message,
      });
    }
  },

  obtenerExpedienteByIdentidad: async (req, res) => {
    const { identidad } = req.query;

    let id_paciente = '101';

    const paciente = await Paciente.findOne({
      where: { numero_identidad: identidad }
    });

    if (!paciente) return res.status(404).json({ message: 'Paciente por identidad no encotrado' });

    id_paciente = paciente.id_paciente;

    try {
      console.log(`Buscando paciente con ID: ${id_paciente}`);

      // Obtener el paciente
      const paciente = await Paciente.findOne({
        where: { id_paciente },
        include: [
          {
            model: Ocupacion,
            attributes: ['id_ocupacion', 'descripcion'],
          },
          {
            model: EstadoCivil,
            attributes: ['id_estado_civil', 'descripcion'],
          },
          {
            model: Sexo,
            attributes: ['id_sexo', 'descripcion'],
          },
        ],
      });

      if (!paciente) {
        console.log(`Paciente con ID: ${id_paciente} no encontrado`);
        return res.status(404).json({ error: "Paciente no encontrado" });
      }

      console.log("Paciente encontrado:", paciente);

      // Obtener las patologías familiares
      const patologiasFamiliares = await HistoriaPatologica.findAll({
        where: { id_paciente, tipo_historia: "familiar" },
        attributes: ["id_patologia", "parentesco"],
        include: [
          {
            model: Patologia,
            as: 'patologia',
            attributes: ['id_patologia', 'descripcion'],
          },
        ],
      });

      // Obtener las patologías personales
      const patologiasPersonales = await HistoriaPatologica.findAll({
        where: { id_paciente, tipo_historia: "personal" },
        attributes: ["id_patologia", "medicamentos", "dosis", "horario"],
        include: [
          {
            model: Patologia,
            as: 'patologia',
            attributes: ['id_patologia', 'descripcion'],
          },
        ],
      });

      // Obtener los antecedentes
      const antecedentes = await AntecedentePaciente.findAll({
        where: { id_paciente },
        include: [
          {
            model: DescripcionAntecedente,
            attributes: ['id_descripcion_antecedente', 'descripcion'],
          },
        ],
      });

      // Obtener los hábitos tóxicos
      const habitosToxicos = await HabitoToxicoPaciente.findAll({
        where: { id_paciente },
        include: [
          {
            model: DescripcionHabitos,
            attributes: ['id_descripcion_habitos', 'descripcion'],
          },
        ],
      });

      // Obtener la historia ginecoobstétrica
      const historiaGineco = await HistoriaGinecoobstetrica.findAll({
        where: { id_paciente },
        include: [
          {
            model: DescripcionGinecobstretica,
            attributes: ['id_descripcion_ginecoobstetrica', 'descripcion'],
          },
        ],
      });

      // Formatear la respuesta
      const expediente = {
        paciente: paciente.toJSON(), // Convertimos para manipular datos fácilmente
        patologiasFamiliares: patologiasFamiliares.map((p) => ({
          ...p.toJSON(),
          descripcion: p.Patologia?.descripcion || "N/A", // Incluimos descripción si existe
        })),
        patologiasPersonales: patologiasPersonales.map((p) => ({
          ...p.toJSON(),
          descripcion: p.Patologia?.descripcion || "N/A", // Incluimos descripción si existe
        })),
        antecedentes,
        habitosToxicos,
        historiaGineco,
      };

      console.log("Expediente completo:", expediente);

      res.status(200).json(expediente);
    } catch (error) {
      console.error("Error al obtener el expediente:", error);
      res.status(500).json({
        error: "Error al obtener el expediente",
        details: error.message,
      });
    }
  },

};

export default obtenerExpedienteController;

