import Rol from '../../models/Seguridad/rolesModel.js';

// Controlador para gestionar antecedentes
const rolesController = {
  // Obtener todos los antecedentes
  obtenerTodosLosRoles: async (req, res) => {
    try {
      const roles = await Rol.findAll();
      res.status(200).json(roles);
    } catch (error) {
      console.error("Error al obtener los roles:", error.message);
      res
        .status(500)
        .json({ error: "Error al obtener los roles", details: error.message });
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
        res.status(404).json({ error: "Rol no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el rol:", error.message);
      res
        .status(500)
        .json({ error: "Error al obtener el rol", details: error.message });
    }
  },
};

export default rolesController;
