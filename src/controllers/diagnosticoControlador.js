import Cita from '../models/Cita/citaModel.js';
import Diagnostico from '../models/Cita/diagnosticoModel.js';
import Paciente from '../models/Expediente/PacienteModel.js';
import Usuario from '../models/Usuario/usuarioModel.js';

export async function guardarDiagnostico(req, res) {
  const { id_cita, id_paciente, historia_enfermedad, receta, diagnostico, id_doctor, examen_fisico, indicaciones } = req.body;

  const cita = await Cita.findAll({
    where: { id_cita }
  });

  // Validar que la cita no haya pasado por consulta
  if (cita[0].id_estado_cita == 4) {
    res.status(400).json({ mensaje: 'La cita ya ha sido pasada a consulta. Verifique' });
    return;
  }

  // Validar que la cita le pertenezca al doctor que la esta haciendo
  if (cita[0].id_usuario != id_doctor) {
    res.status(400).json({ mensaje: `La cita ${id_cita} no le pertene` });
    return;
  }

  try {
    Diagnostico.create({
      id_usuario: id_doctor,
      id_cita,
      id_paciente,
      historia_enfermedad,
      receta,
      fecha: new Date(),
      diagnostico,
      examen_fisico,
      indicaciones,
    });

    Cita.update({
      id_estado_cita: 4,
    }, {
      where: {
        id_cita,
      }
    });

    return res.status(200).json({
      mensaje: 'Diagnostico creado correctamente',
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: 'Error al crear el diagnostico',
      details: error,
    });
  }
}


export async function getDianosticoByPaciente(req, res) {
  const { id_paciente } = req.query;

  try {

    const diagnosticos = Diagnostico.findAll({
      where: { id_paciente },
      include: [
        {
          model: Paciente,
          as: 'paciente',
          attributes: ['nombre_completo', 'numero_identidad', 'telefono']
        },
        {
          model: Cita,
          as: 'cita',
          attributes: ['fecha', 'hora', 'motivo_cita'],
        },
        {
          model: Usuario,
          attributes: ['nombre_de_usuario'],
        }
      ]
    });

    if (diagnosticos.length == 0) {
      res.status(200).json({ mensaje: 'El paciente no tiene consultas previas' });
      return;
    }

    res.json(diagnosticos);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: 'Error al obtener diagnostico',
      details: error,
    });
  }

}
