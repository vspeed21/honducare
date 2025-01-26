// Importamos el modelo y Sequelize
import Cargo from '../../../models/Mantenimiento/cargosModel.js';

// Controlador para crear un nuevo Cargo
const crearCargo = async (req, res) => {
  const { descripcion } = req.body;

  // Validación básica
  if (!descripcion) {
    return res.status(400).json({
      mensaje: "La descripción es obligatoria.",
    });
  }

  try {
    // Crear un nuevo cargo
    const nuevoCargo = await Cargo.create({ descripcion });

    // Respuesta exitosa
    return res.status(200).json({
      mensaje: "Cargo creado exitosamente.",
      data: nuevoCargo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al crear el cargo.",
      error: error.message,
    });
  }
};

export default crearCargo;
