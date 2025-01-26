import DescripcionGinecobstretica from '../../../models/Mantenimiento/descripcion_ginecobstetrica_Model.js';

const descripcionController = {
deleteDescripcionGinecobstretica : async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await DescripcionGinecobstretica.destroy({
      where: { id_descripcion_ginecoobstetrica: id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Descripción no encontrada" });
    }

    res.json({ message: "Descripción eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la descripción" });
  }
}
};

export default descripcionController;
