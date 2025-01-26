import preclinica from '../../models/Cita/preclinicaModel.js';

// Controlador para eliminar una preclínica
const pcController = {
eliminarPreclinica : async (req, res) => {
  const { id_paciente } = req.params;

  try {
    // Eliminar la preclínica
    const preclinicaEliminada = await preclinica.destroy({
      where: { id_paciente },
    });

    if (preclinicaEliminada === 1) {
      res.status(200).json({ message: "Preclínica eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Preclínica no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar la preclínica:", error.message);
    res
      .status(500)
      .json({
        error: "Error al eliminar la preclínica",
        details: error.message,
      });
  }
}
};

export default pcController;
