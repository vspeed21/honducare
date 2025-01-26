import Ocupacion from '../../../models/Mantenimiento/ocupacionModel.js';

// Controlador para gestionar ocupaciones
const ocupacionController = {
  // ... otras funciones del controlador ...

  // Actualizar una ocupación
  actualizarOcupacion: async (req, res) => {
    const { id_ocupacion } = req.params;
    const { descripcion } = req.body;

    try {
      // Encuentra la ocupación por ID
      const ocupacion = await Ocupacion.findByPk(id_ocupacion);

      if (!ocupacion) {
        return res.status(404).json({ error: "Ocupación no encontrada" });
      }

      // Actualiza los datos de la ocupación
      await ocupacion.update({
        descripcion,
      });

      res
        .status(200)
        .json({
          message: "Ocupación actualizada exitosamente",
          data: ocupacion,
        });
    } catch (error) {
      console.error("Error al actualizar la ocupación:", error.message);
      res
        .status(500)
        .json({
          error: "Error al actualizar la ocupación",
          details: error.message,
        });
    }
  },
};

export default ocupacionController;
