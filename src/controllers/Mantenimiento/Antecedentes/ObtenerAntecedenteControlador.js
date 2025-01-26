import Cita from '../../../models/Cita/citaModel.js';
import Diagnostico from '../../../models/Cita/diagnosticoModel.js';
import Paciente from '../../../models/Expediente/PacienteModel.js';
import DescripcionAntecedente from '../../../models/Mantenimiento/descripcion_antecedenteModel.js';
import Usuario from '../../../models/Usuario/usuarioModel.js';

// Controlador para gestionar antecedentes
const antecedentesController = {
  // Obtener todos los antecedentes
  obtenerTodosLosAntecedentes: async (req, res) => {
    try {
      const antecedentes = await DescripcionAntecedente.findAll();
      res.status(200).json(antecedentes);
    } catch (error) {
      console.error('Error al obtener los antecedentes:', error.message);
      res.status(500).json({ error: 'Error al obtener los antecedentes', details: error.message });
    }
  },

  // Obtener un antecedente específico
  obtenerAntecedente: async (req, res) => {
    const { id } = req.params;

    try {
      const antecedentes = await Diagnostico.findAll({
        where: {
          id_paciente: id,
        },
        include: [
          {
            model: Cita,
            as: 'cita',
            attributes: ['fecha', 'hora', 'motivo_cita'],
          },
          {
            model: Paciente,
            as: 'paciente',
            attributes: ['nombre_completo', 'edad', 'telefono', 'numero_identidad', 'direccion'],
          },
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['nombre_de_usuario', 'correo_electronico'],
          },
        ]
      });

      if (antecedentes.length > 0) {
        res.status(200).json(antecedentes);
      } else {
        res.status(404).json({ mensaje: 'No se encontraron antecedentes clinicos con este paciente' });
      }
    } catch (error) {
      console.error('Error al obtener los antecedentes del paciente:', error);
      res.status(500).json({ mensaje: 'Error al obtener antecedentes del paciente', details: error });
    }
  }
};

export default antecedentesController;