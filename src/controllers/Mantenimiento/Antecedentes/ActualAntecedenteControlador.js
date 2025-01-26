import  DescripcionAntecedente  from '../../../models/Mantenimiento/descripcion_antecedenteModel.js';


// Controlador para gestionar antecedentes
const antecedentesController = {
  // ... otras funciones del controlador ...

  // Actualizar un antecedente
  actualizarAntecedente: async (req, res) => {
    const { id_descripcion_antecedente } = req.params;
    const { descripcion } = req.body;

    try {
      // Encuentra el antecedente por ID
      const antecedente = await DescripcionAntecedente.findByPk(
        id_descripcion_antecedente
      );

      if (!antecedente) {
        return res.status(404).json({ error: "Antecedente no encontrado" });
      }

      // Actualiza los datos del antecedente
      await antecedente.update({
        descripcion,
      });

      res
        .status(200)
        .json({
          message: "Antecedente actualizado exitosamente",
          data: antecedente,
        });
    } catch (error) {
      console.error("Error al actualizar el antecedente:", error.message);
      res
        .status(500)
        .json({
          error: "Error al actualizar el antecedente",
          details: error.message,
        });
    }
  },
};

export default antecedentesController ;
