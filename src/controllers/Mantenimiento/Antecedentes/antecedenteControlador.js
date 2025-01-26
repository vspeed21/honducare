import DescripcionAntecedente from '../../../models/Mantenimiento/descripcion_antecedenteModel.js';

// Controlador para gestionar antecedentes
const antecedentesController = {
  // Crear un nuevo antecedente
  crearAntecedente: async (req, res) => {
    const { descripcion } = req.body;

    try {
      const nuevoAntecedente = await DescripcionAntecedente.create({
        descripcion,
      });

      res
        .status(200)
        .json({
          message: "Antecedente creado exitosamente",
          data: nuevoAntecedente,
        });
    } catch (error) {
      console.error("Error al crear el antecedente:", error.message);
      res
        .status(500)
        .json({
          error: "Error al crear el antecedente",
          details: error.message,
        });
    }
  },
};

// Exportar el controlador
export  default antecedentesController;
