import EstadoCita from '../../../models/Cita/estado_cita.js'; // Ajusta la ruta a tu modelo

// Controlador para gestionar estados
const estadoController = {
  // Crear un nuevo estado
  crearEstado: async (req, res) => {
    const { descripcion } = req.body;

    if (!descripcion || descripcion.trim() === "") {
      return res.status(400).json({ error: "La descripción es obligatoria." });
    }

    try {
      const nuevoEstado = await EstadoCita.create({ descripcion });
      res
        .status(200)
        .json({ message: "Estado creado exitosamente", data: nuevoEstado });
    } catch (error) {
      console.error("Error al crear el estado:", error.message);
      res
        .status(500)
        .json({ error: "Error al crear el estado", details: error.message });
    }
  },
};

export default estadoController;
