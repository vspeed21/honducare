import HabitoToxicoPaciente from '../../../models/Mantenimiento/descripcion_habitos_Model.js'; // Ajusta la ruta a tu modelo

const HTController = {
deleteHabitoToxico : async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await HabitoToxicoPaciente.destroy({
      where: { id_descripcion_habitos: id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Hábito tóxico no encontrado" });
    }

    res.json({ message: "Hábito tóxico eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el hábito tóxico" });
  }
}
};

export default HTController;
