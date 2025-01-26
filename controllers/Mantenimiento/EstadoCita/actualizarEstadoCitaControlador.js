import EstadoCita from '../../../models/Cita/estado_cita.js'; // Ajusta la ruta a tu modelo

// Controlador para gestionar estados
const estadoController = {
  // Actualizar un estado por ID
  actualizarEstado: async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion } = req.body;

      const estadoActualizado = await EstadoCita.update(
        { descripcion },
        { where: { id_estado_cita: id } }
      );

      if (estadoActualizado[0] === 0) {
        return res.status(404).json({ message: "Estado no encontrado" });
      }

      res.json({ message: "Estado actualizado exitosamente" });
    } catch (error) {
      console.error("Error al actualizar el estado:", error.message);
      res
        .status(500)
        .json({
          error: "Error al actualizar el estado",
          details: error.message,
        });
    }
  },
};

export default estadoController;
