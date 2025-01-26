import { Op, col } from 'sequelize';
import Usuario from '../../models/Usuario/usuarioModel.js';
import Roles from '../../models/Seguridad/rolesModel.js';
import Especialidades from '../../models/Mantenimiento/EspecialidadesModel.js';

// Controlador para gestionar antecedentes
const usuarioController = {
  obtenerUsuarioPorNombre: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll({
        where: {
          nombre_de_usuario: {
            [Op.iLike]: `%${req.query.nombre}%` // Buscar por nombre sin sensibilidad a mayusculas
          }
        }
      });

      if (usuarios.length == 0) {
        res.json({ mensaje: 'No se encontraron usuarios', nombre: req.query.nombre });
        return;
      }

      res.json(usuarios);

    } catch (error) {
      console.log(error);
    }
  },
  // Obtener todos los antecedentes
  obtenerTodosLosUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error.message);
      res.status(500).json({ error: 'Error al obtener los usuarios', details: error });
    }
  },

  // Obtener un antecedente específico
  obtenerUsuario: async (req, res) => {
    const { id_usuario } = req.params;

    try {
      const usuario = await Usuario.findOne({
        where: { id_usuario },
        include: [
          {
            model: Roles,
            as: 'rol',
          },
          {
            model: Especialidades,
            as: 'especialidad',
          },
        ],
      });

      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error.message);
      res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
    }
  },

  obtenerUsuarioEmail: async (req, res) => {
    const { correo_electronico } = req.params;

    try {
      const usuarios = await Usuario.findBy(correo_electronico);

      if (usuarios.length) {
        res.status(200).json(usuarios);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error.message);
      res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
    }
  },
  obtenerUsuarioPorRol: async (req, res) => {
    const { id_rol } = req.params;

    let usuarios;

    try {
      // Si es rol de doctor (1) hacemos la consulta de usuarios y especialida
      if (id_rol == 1) {
        usuarios = await Usuario.findAll({
          where: { id_rol },
          include: [
            {
              model: Especialidades,
              as: 'especialidad',
            }
          ],
        });
      }

      const usuarios2 = usuarios.map(user => {
        return {
          id_usuario: user.id_usuario,
          nombre_especialidad: user.nombre_de_usuario + ' - ' + user.especialidad.nombre,
        }
      });


      if (id_rol != 1) {
        usuarios = await Usuario.findAll({
          where: { id_rol }
        });
      }

      if (usuarios) {
        res.status(200).json(id_rol == 1 ? usuarios2 : usuarios);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error.message);
      res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
    }
  }
};

export default usuarioController;