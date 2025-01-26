import Ocupacion from '../../../models/Mantenimiento/ocupacionModel.js';

// Controlador para gestionar ocupaciones
const ocupacionController = {
  // Obtener todas las ocupaciones
  obtenerTodasLasOcupaciones: async (req, res) => {
    try {
      const id_ocupacion = await Ocupacion.findAll();
      res.status(200).json(id_ocupacion);
    } catch (error) {
      console.error("Error al obtener las ocupaciones:", error.message);
      res
        .status(500)
        .json({
          error: "Error al obtener las ocupaciones",
          details: error.message,
        });
    }
  },
};

export default ocupacionController;
