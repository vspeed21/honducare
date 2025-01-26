// eliminarExpedienteController.js
import Paciente from '../../models/Expediente/PacienteModel.js';
import AntecedentePaciente from '../../models/Expediente/antecedentesPModel.js';
import HistoriaPatologica from '../../models/Expediente/historia_patologica_models.js';
import HabitoToxicoPaciente from '../../models/Expediente/habito_toxico_paciente_Model.js';
import HistoriaGinecoobstetrica  from '../../models/Expediente/historia_ginecobstetrica_paciente_Models.js';

const eliminarExpedienteController = {
// Controlador para eliminar un expediente
 eliminarExpediente : async (req, res) => {
  const { id_paciente } = req.params;

  try {
    // Primero eliminamos los antecedentes
    await AntecedentePaciente.destroy({ where: { id_paciente } });

    // Luego eliminamos las patologías familiares
    await HistoriaPatologica.destroy({ where: { id_paciente } });

    // Luego eliminamos los hábitos tóxicos
    await HabitoToxicoPaciente.destroy({ where: { id_paciente } });

    // Finalmente, eliminamos la historia ginecoobstétrica
    await HistoriaGinecoobstetrica.destroy({ where: { id_paciente } });

    // Por último, eliminamos el paciente
    await Paciente.destroy({ where: { id_paciente } });

    res.status(200).json({ message: 'Expediente eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el expediente:', error.message);
    res.status(500).json({ error: 'Error al eliminar el expediente', details: error.message });
  }
}
};

export default eliminarExpedienteController ;




