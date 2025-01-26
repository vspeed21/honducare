import Cargo from '../../../models/Mantenimiento/cargosModel.js'; // Ajusta la ruta a tu modelo

const cargoController = {

// Actualizar un cargo por ID
 updateCargo : async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;

    // Validación básica (puedes agregar más validaciones según tus necesidades)
    if (!descripcion) {
      return res
        .status(400)
        .json({ message: "La descripción del cargo es requerida" });
    }

    // Validación adicional: limitar la longitud de la descripción
    // //if (descripcion.length > 10) {
    //     return res.status(400).json({ message: 'La descripción del cargo no puede exceder los 10 caracteres' });
    // }

    const [updatedRows, [updatedCargo]] = await Cargo.update(
      { descripcion },
      { where: { id_cargo: id }, returning: true }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Cargo no encontrado" });
    }

    res.json(updatedCargo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el cargo" });
  }
}
};

export default cargoController;
