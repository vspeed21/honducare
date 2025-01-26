import Patologia from '../../../models/Mantenimiento/patologiasModel.js';

// Controlador para gestionar patologías
const patologiaController = {
  // ... otras funciones del controlador ...

  // Eliminar una patología
  eliminarPatologia: async (req, res) => {
    const { id_patologia } = req.params;

    try {
      // Encuentra y elimina la patología
      const patologiaEliminada = await Patologia.destroy({
        where: { id_patologia: id_patologia },
      });

      if (patologiaEliminada) {
        res.status(200).json({ message: "Patología eliminada exitosamente" });
      } else {
        res.status(404).json({ error: "Patología no encontrada" });
      }
    } catch (error) {
      console.error("Error al eliminar la patología:", error.message);
      res.status(500).json({
        error: "Error al eliminar la patología",
        details: error.message,
      });
    }
  },
};

export default patologiaController;
