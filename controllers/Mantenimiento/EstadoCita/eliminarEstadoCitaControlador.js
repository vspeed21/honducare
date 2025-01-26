import EstadoCita from '../../../models/Cita/estado_cita.js'; // Ajusta la ruta a tu modelo

// Controlador para gestionar estados
const estadoController = {
  // Eliminar un estado por ID
  eliminarEstado: async (req, res) => {
    try {
      const { id } = req.params;

      const estadoEliminado = await EstadoCita.destroy({
        where: { id_estado_cita: id },
      });

      if (estadoEliminado === 0) {
        return res.status(404).json({ message: "Estado no encontrado" });
      }

      res.json({ message: "Estado eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar el estado:", error.message);
      res
        .status(500)
        .json({ error: "Error al eliminar el estado", details: error.message });
    }
  },
};

export default estadoController;
