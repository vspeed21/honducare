import Paciente from '../../models/Expediente/PacienteModel.js';
import AntecedentePaciente from '../../models/Expediente/antecedentesPModel.js';
import HistoriaPatologica from '../../models/Expediente/historia_patologica_models.js';
import HabitoToxicoPaciente from '../../models/Expediente/habito_toxico_paciente_Model.js';
import HistoriaGinecoobstetrica from '../../models/Expediente/historia_ginecobstetrica_paciente_Models.js';

const antecedentesController = {
  crearExpediente: async (req, res) => {
    const {
      nombre_completo,
      numero_identidad,
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
      como_se_entero,
    } = req.body;

    try {
      let id_paciente;

      const pacienteYaCreado = await Paciente.findOne({
        where: { numero_identidad }
      });

      if (!pacienteYaCreado) {
        const nuevoPaciente = await Paciente.create({
          nombre_completo,
          numero_identidad,
          edad,
          nacionalidad,
          telefono,
          id_documento,
          correo_electronico,
          direccion,
          id_estado_civil,
          id_sexo,
          id_ocupacion,
          fecha_registro: new Date(),
          como_se_entero,
        });
        id_paciente = nuevoPaciente.id_paciente;
      } else {
        id_paciente = pacienteYaCreado.id_paciente;
      }


      // 2. Insertar patologías familiares en `tbl_historia_patologica`
      if (patologiasFamiliares) {
        await Promise.all(
          patologiasFamiliares.map(async ({ id_patologia, parentesco }) => {
            await HistoriaPatologica.create({
              id_paciente,
              id_patologia,
              tipo_historia: 'familiar',
              parentesco
            });
          })
        );
      }

      // 3. Insertar patologías personales en `tbl_historia_patologica`
      if (patologiasPersonales) {
        await Promise.all(
          patologiasPersonales.map(({ id_patologia, medicamentos, dosis, horario }) =>
            HistoriaPatologica.create({
              id_paciente,
              id_patologia,
              tipo_historia: 'personal',
              medicamentos,
              dosis,
              horario
            })
          )
        );
      }

      // 4. Insertar antecedentes hospitalarios
      if (antecedentesHospitalarios) {
        await Promise.all(
          antecedentesHospitalarios.map(({ id_descripcion_antecedente }) =>
            AntecedentePaciente.create({
              id_paciente,
              id_descripcion_antecedente
            })
          )
        );
      }

      // 5. Insertar hábitos tóxicos
      if (habitosToxicos) {
        await Promise.all(
          habitosToxicos.map(({ id_descripcion_habitos }) =>
            HabitoToxicoPaciente.create({
              id_paciente,
              id_descripcion_habitos
            })
          )
        );
      }

      // 6. Insertar historia ginecoobstétrica
      if (ginecobstetrica) {
        await Promise.all(
          ginecobstetrica.map(({ id_descripcion_ginecoobstetrica }) =>
            HistoriaGinecoobstetrica.create({
              id_paciente,
              id_descripcion_ginecoobstetrica
            })
          )
        );
      }

      res.status(201).json({ message: 'Expediente creado exitosamente' });
    } catch (error) {
      console.error('Error al crear el expediente:', error.message);
      res.status(500).json({ error: 'Error al crear el expediente', details: error.message });
    }
  }
};

export default antecedentesController;



