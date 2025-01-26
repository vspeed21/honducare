import Rol from '../../models/Seguridad/rolesModel.js';

// Controlador para gestionar antecedentes
const rolesController = {
  // ... otras funciones del controlador ...

  // Actualizar un antecedente
  actualizarRol: async (req, res) => {
    const { id_rol } = req.params;
    const { rol, descripcion } = req.body;

    try {
      // Encuentra el antecedente por ID
      const roles = await Rol.findByPk(id_rol);

      if (!roles) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      // Actualiza los datos del antecedente
      await roles.update({
        rol,
        descripcion,
      });

      res
        .status(200)
        .json({ message: "Rol actualizado exitosamente", data: roles });
    } catch (error) {
      console.error("Error al actualizar el rol:", error.message);
      res
        .status(500)
        .json({ error: "Error al rol el antecedente", details: error.message });
    }
  },

  crearRol: async (req, res) => {
    const { rol, descripcion } = req.body;

    try {
      const nuevoRol = await Rol.create({
        rol,
        descripcion
      });

      res.status(200).json({ message: 'Rol creado exitosamente', data: nuevoRol });
    } catch (error) {
      console.error('Error al crear el rol:', error.message);
      res.status(500).json({ error: 'Error al crear el rol', details: error.message });
    }
  },

  eliminarRol: async (req, res) => {
    const { id } = req.params;

    try {
      const rolEliminado = await Rol.destroy({
        where: { id_rol: id }
      });

      if (rolEliminado) {
        res.status(200).json({ message: 'Rol eliminado exitosamente' });
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      console.error('Error al eliminar el rol:', error.message);
      res.status(500).json({ error: 'Error al eliminar el antecedente', details: error.message });
    }
  },

  obtenerTodosLosRoles: async (req, res) => {
    try {
      const roles = await Rol.findAll();
      res.status(200).json(roles);
    } catch (error) {
      console.error('Error al obtener los roles:', error.message);
      res.status(500).json({ error: 'Error al obtener los roles', details: error.message });
    }
  },

  // Obtener un antecedente específico
  obtenerRol: async (req, res) => {
    const { id_rol } = req.params;

    try {
      const rol = await Rol.findByPk(id_rol);

      if (rol) {
        res.status(200).json(rol);
      } else {
        res.status(404).json({ error: 'Rol no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el rol:', error.message);
      res.status(500).json({ error: 'Error al obtener el rol', details: error.message });
    }
  }
};

export default rolesController;
