import Ocupacion from '../../../models/Mantenimiento/ocupacionModel.js';

// Controlador para gestionar ocupaciones
const ocupacionController = {
  // Crear una nueva ocupación
  crearOcupacion: async (req, res) => {
    const { descripcion } = req.body;

    try {
      const nuevaOcupacion = await Ocupacion.create({
        descripcion,
      });

      res.status(200).json({
        message: "Ocupación creada exitosamente",
        data: nuevaOcupacion,
      });
    } catch (error) {
      console.error("Error al crear la ocupación:", error.message);
      res
        .status(500)
        .json({ error: "Error al crear la ocupación", details: error.message });
    }
  },
};

export default ocupacionController;
