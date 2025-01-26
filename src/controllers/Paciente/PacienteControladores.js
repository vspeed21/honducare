import { Op } from 'sequelize';
import Paciente from '../../models/Expediente/PacienteModel.js';
import EstadoCivil from '../../models/Mantenimiento/estado_civilModel.js';
import Ocupacion from '../../models/Mantenimiento/ocupacionModel.js';
import Sexo from '../../models/Mantenimiento/sexoModel.js';
import Bitacora from '../../models/Mantenimiento/BitacoraModel.js';

// Controlador para obtener todos los pacientes
const getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({
      include: [
        {
          model: EstadoCivil,
          attributes: ['id_estado_civil'], // Ajusta según las columnas de tu tabla EstadoCivil
        },
        {
          model: Sexo,
          attributes: ['id_sexo', 'descripcion'], // Ajusta según las columnas de tu tabla Sexo
        },
      ],
    });
    res.status(200).json(pacientes);
  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
    res.status(500).json({ error: 'Error al obtener los pacientes' });
  }
};


const getPacientesById = async (req, res) => {

  const { id } = req.params;

  const { filter = 'id' } = req.query;

  const where = filter == 'id' ? { id_paciente: id } : { numero_identidad: { [Op.iLike]: `%${id}%` } };
  console.log(where);

  try {
    const pacientes = await Paciente.findOne({
      where,
      include: [
        {
          model: EstadoCivil,
          attributes: ['id_estado_civil', 'descripcion'],
        },
        {
          model: Sexo,
          attributes: ['id_sexo', 'descripcion'],
        },
        {
          model: Ocupacion,
          attributes: ['id_ocupacion', 'descripcion'],
        },
      ],
    });
    res.status(200).json(pacientes ? pacientes : []);
  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
    res.status(500).json({ error: 'Error al obtener los pacientes', error });
  }
};

// Crear paciente al momento de crear cita.
const crearPaciente = async (req, res) => {
  const { nombre, identidad, telefono } = req.body;

  try {
    const paciente = await Paciente.create({
      numero_identidad: identidad,
      nombre_completo: nombre,
      telefono,
      fecha_registro: new Date(),
    });

    const bitacoras = await Bitacora.findAll({
      order: [
        ['id_bitacora', 'ASC']
      ]
    });

    await Bitacora.create({
      id_bitacora: bitacoras[bitacoras.length - 1].id_bitacora + 1,
      id_usuario: req.user.usuario.id_usuario,
      fecha: new Date(),
      operacion: `Creo el paciente con el id ${paciente.id_paciente}`,
    });

    return res.status(200).json(paciente);

  } catch (error) {
    console.log(error);
  }

}

const updatePacientes = async (req, res) => {

  const { id } = req.params;

  const { name, identidad, phone, age, email, id_sexo, direccion, id_estado_civil, como_se_entero } = req.body;


  try {
    const [numeroFilasActualizadas] = await Paciente.update(
      {
        nombre_completo: name,
        edad: age,
        numero_identidad: identidad,
        correo_electronico: email,
        id_sexo,
        direccion1: direccion,
        id_estado_civil,
        telefono: phone,
        como_se_entero,
      },
      {
        where: { id_paciente: id },
      }
    );

    if (numeroFilasActualizadas === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrada' });
    }

    return res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el Usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor', error });
  }
}

const eliminarPacientes = async (req, res) => {
  const { id } = req.params;
  console.log('ID recibido para eliminar:', id);

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      console.log('Paciente no encontrado');
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    await paciente.destroy();
    console.log('Paciente eliminado con éxito');
    res.status(200).json({ message: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el paciente:', error);
    res.status(500).json({ error: 'Error al eliminar el paciente' });
  }
};




export { getPacientes, getPacientesById, updatePacientes, eliminarPacientes, crearPaciente };
