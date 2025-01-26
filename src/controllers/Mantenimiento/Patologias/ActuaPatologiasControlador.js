import Patologia from '../../../models/Mantenimiento/patologiasModel.js';

// Controlador para gestionar patologías
const patologiaController = {
  // ... otras funciones del controlador ...

  // Actualizar una patología
  actualizarPatologia: async (req, res) => {
    const { id_patologia } = req.params;
    const { descripcion } = req.body;

    try {
      // Encuentra la patología por ID
      const patologia = await Patologia.findByPk(id_patologia);

      if (!patologia) {
        return res.status(404).json({ error: "Patología no encontrada" });
      }

      // Actualiza los datos de la patología
      await patologia.update({
        descripcion,
      });

      res
        .status(200)
        .json({
          message: "Patología actualizada exitosamente",
          data: patologia,
        });
    } catch (error) {
      console.error("Error al actualizar la patología:", error.message);
      res
        .status(500)
        .json({
          error: "Error al actualizar la patología",
          details: error.message,
        });
    }
  },
};

export default patologiaController ;
