import Rol from '../../models/Seguridad/rolesModel.js';

// Controlador para gestionar antecedentes
const rolesController = {
  // Crear un nuevo antecedente
  crearRol: async (req, res) => {
    const { rol, descripcion } = req.body;

    try {
      const nuevoRol = await Rol.create({
        rol,
        descripcion,
      });

      res
        .status(200)
        .json({ message: "Rol creado exitosamente", data: nuevoRol });
    } catch (error) {
      console.error("Error al crear el rol:", error.message);
      res
        .status(500)
        .json({ error: "Error al crear el rol", details: error.message });
    }
  },
};

export default rolesController;
