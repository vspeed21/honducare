import DescripcionGinecobstretica from '../../../models/Mantenimiento/descripcion_ginecobstetrica_Model.js'; // Ajusta la ruta a tu modelo

// Controlador para gestionar Descripción Ginecoobstétrica
const descripcionGinecobstreticaController = {
  // Actualizar una descripción ginecoobstétrica por ID
  actualizarDescripcionGinecobstretica: async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion } = req.body;

      // Validación básica
      if (!descripcion) {
        return res.status(400).json({ message: "La descripción es requerida" });
      }

      // Actualizar la descripción en la base de datos
      const descripcionActualizada = await DescripcionGinecobstretica.update(
        { descripcion },
        { where: { id_descripcion_ginecoobstetrica: id } }
      );

      // Verificar si se actualizó alguna fila
      if (descripcionActualizada[0] === 0) {
        return res.status(404).json({ message: "Descripción no encontrada" });
      }

      res.json({ message: "Descripción actualizada exitosamente" });
    } catch (error) {
      console.error("Error al actualizar la descripción:", error.message);
      res
        .status(500)
        .json({
          error: "Error al actualizar la descripción",
          details: error.message,
        });
    }
  },
};

export default descripcionGinecobstreticaController;
