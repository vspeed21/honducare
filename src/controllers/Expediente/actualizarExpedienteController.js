import Paciente from '../../models/Expediente/PacienteModel.js';
import AntecedentePaciente from '../../models/Expediente/antecedentesPModel.js';
import HistoriaPatologica from '../../models/Expediente/historia_patologica_models.js';
import HabitoToxicoPaciente from '../../models/Expediente/habito_toxico_paciente_Model.js';
import HistoriaGinecoobstetrica from '../../models/Expediente/historia_ginecobstetrica_paciente_Models.js';

const actualizarExpedienteController = {
 actualizarExpediente : async (req, res) => {
  const { id_paciente } = req.params;
  const {
    nombre_completo,
    edad,
    nacionalidad,
    telefono,
    id_documento,
    correo_electronico,
    direccion,
    id_estado_civil,
    id_sexo,
    id_ocupacion,
    patologiasFamiliares,
    patologiasPersonales,
    antecedentesHospitalarios,
    habitosToxicos,
    ginecobstetrica,
  } = req.body;

  try {
    // Actualizar los datos básicos del paciente
    await Paciente.update(
      {
        nombre_completo,
        edad,
        nacionalidad,
        telefono,
        id_documento,
        correo_electronico,
        direccion,
        id_estado_civil,
        id_sexo,
        id_ocupacion,
      },
      { where: { id_paciente } }
    );

    // Actualizar las patologías familiares
    await HistoriaPatologica.destroy({
      where: { id_paciente, tipo_historia: "familiar" },
    });
    await Promise.all(
      patologiasFamiliares.map(({ id_patologia, parentesco }) =>
        HistoriaPatologica.create({
          id_paciente,
          id_patologia,
          tipo_historia: "familiar",
          parentesco,
        })
      )
    );

    // Actualizar las patologías personales
    await HistoriaPatologica.destroy({
      where: { id_paciente, tipo_historia: "personal" },
    });
    await Promise.all(
      patologiasPersonales.map(
        ({ id_patologia, medicamentos, dosis, horario }) =>
          HistoriaPatologica.create({
            id_paciente,
            id_patologia,
            tipo_historia: "personal",
            medicamentos,
            dosis,
            horario,
          })
      )
    );

    // Actualizar los antecedentes hospitalarios
    await AntecedentePaciente.destroy({ where: { id_paciente } });
    console.log(
      "Datos de antecedentes hospitalarios recibidos:",
      antecedentesHospitalarios
    );
    await Promise.all(
      antecedentesHospitalarios.map(({ id_descripcion_antecedente }) =>
        AntecedentePaciente.create({
          id_paciente,
          id_descripcion_antecedente,
        })
      )
    );

    // Actualizar los hábitos tóxicos
    await HabitoToxicoPaciente.destroy({ where: { id_paciente } });
    await Promise.all(
      habitosToxicos.map(({ id_descripcion_habitos }) =>
        HabitoToxicoPaciente.create({
          id_paciente,
          id_descripcion_habitos,
        })
      )
    );

    // Actualizar la historia ginecoobstétrica
    await HistoriaGinecoobstetrica.destroy({ where: { id_paciente } });
    console.log(
      "Datos de historia ginecoobstétrica recibidos:",
      ginecobstetrica
    );
    await Promise.all(
      ginecobstetrica.map(({ id_descripcion_ginecoobstetrica }) =>
        HistoriaGinecoobstetrica.create({
          id_paciente,
          id_descripcion_ginecoobstetrica,
        })
      )
    );

    res.status(200).json({ message: "Expediente actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el expediente:", error.message);
    res
      .status(500)
      .json({
        error: "Error al actualizar el expediente",
        details: error.message,
      });
  }
}
};

export default actualizarExpedienteController ;
