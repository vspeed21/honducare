import Sexo from '../../../models/Mantenimiento/sexoModel.js';

// Controlador para gestionar sexos
const sexoController = {
  // Eliminar un sexo
  eliminarSexo: async (req, res) => {
    const { id } = req.params;

    try {
      // Encuentra y elimina el sexo
      const sexoEliminado = await Sexo.destroy({
        where: { id_sexo: id },
      });

      if (sexoEliminado) {
        res.status(200).json({ message: "Sexo eliminado exitosamente" });
      } else {
        res.status(404).json({ error: "Sexo no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar el sexo:", error.message);
      res
        .status(500)
        .json({ error: "Error al eliminar el sexo", details: error.message });
    }
  },
};

export default sexoController;
