import Patologia from '../../../models/Mantenimiento/patologiasModel.js';

// Controlador para gestionar patologías
const patologiaController = {
  // ... otras funciones del controlador ...

  // Obtener todas las patologías
  obtenerPatologias: async (req, res) => {
    try {
      const patologias = await Patologia.findAll();
      res.status(200).json(patologias);
    } catch (error) {
      console.error("Error al obtener las patologías:", error.message);
      res
        .status(500)
        .json({
          error: "Error al obtener las patologías",
          details: error.message,
        });
    }
  },

  // Obtener una patología específica por ID
  obtenerPatologia: async (req, res) => {
    const { id_patologia } = req.params;

    try {
      const patologia = await Patologia.findByPk(id_patologia);

      if (patologia) {
        res.status(200).json(patologia);
      } else {
        res.status(404).json({ error: "Patología no encontrada" });
      }
    } catch (error) {
      console.error("Error al obtener la patología:", error.message);
      res
        .status(500)
        .json({
          error: "Error al obtener la patología",
          details: error.message,
        });
    }
  },
};

export default patologiaController;
