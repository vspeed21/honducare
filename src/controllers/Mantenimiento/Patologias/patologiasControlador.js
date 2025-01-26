import Patologia from '../../../models/Mantenimiento/patologiasModel.js';

// Controlador para crear una nueva patología
const patologiaController = {
  crearPatologia: async (req, res) => {
    const { descripcion } = req.body;

    try {
      const nuevaPatologia = await Patologia.create({
        descripcion,
      });

      res
        .status(200)
        .json({
          message: "Patología creada exitosamente",
          data: nuevaPatologia,
        });
    } catch (error) {
      console.error("Error al crear la patología:", error.message);
      res
        .status(500)
        .json({ error: "Error al crear la patología", details: error.message });
    }
  },
};

export default patologiaController;
