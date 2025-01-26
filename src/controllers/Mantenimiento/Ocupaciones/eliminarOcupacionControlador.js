import Ocupacion from '../../../models/Mantenimiento/ocupacionModel.js';

// Controlador para gestionar ocupaciones
const ocupacionController = {
  // ... otras funciones del controlador ...

  // Eliminar una ocupación
  eliminarOcupacion: async (req, res) => {
    const { id_ocupacion } = req.params;

    try {
      // Encuentra y elimina la ocupación
      const ocupacionEliminada = await Ocupacion.destroy({
        where: { id_ocupacion },
      });

      if (ocupacionEliminada) {
        res.status(200).json({ message: "Ocupación eliminada exitosamente" });
      } else {
        res.status(404).json({ error: "Ocupación no encontrada" });
      }
    } catch (error) {
      console.error("Error al eliminar la ocupación:", error.message);
      res.status(500).json({
        error: "Error al eliminar la ocupación",
        details: error.message,
      });
    }
  },
};

export default ocupacionController;
