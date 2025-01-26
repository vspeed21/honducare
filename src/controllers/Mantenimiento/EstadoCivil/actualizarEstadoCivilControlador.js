import EstadoCivil from '../../../models/Mantenimiento/estado_civilModel.js'; // Ajusta la ruta a tu modelo

// Controlador para gestionar Estado Civil
const estadoCivilController = {
  // Actualizar un estado civil
  actualizarEstadoCivil: async (req, res) => {
    const { id } = req.params; // Suponiendo que el ID del estado civil se envía como `id`
    const { descripcion } = req.body;

    try {
      // Encuentra el estado civil por ID
      const estadoCivil = await EstadoCivil.findByPk(id);

      if (!estadoCivil) {
        return res.status(404).json({ error: "Estado civil no encontrado" });
      }

      // Actualiza los datos del estado civil
      await estadoCivil.update({
        descripcion,
      });

      res
        .status(200)
        .json({
          message: "Estado civil actualizado exitosamente",
          data: estadoCivil,
        });
    } catch (error) {
      console.error("Error al actualizar el estado civil:", error.message);
      res
        .status(500)
        .json({
          error: "Error al actualizar el estado civil",
          details: error.message,
        });
    }
  },
};

export default estadoCivilController;
