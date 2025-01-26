import EstadoCivil from '../../../models/Mantenimiento/estado_civilModel.js';

const deleteEstadoCivil = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await EstadoCivil.destroy({
      where: { id_estado_civil: id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Estado civil no encontrado" });
    }

    res.json({ message: "Estado civil eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el estado civil" });
  }
};

export default deleteEstadoCivil;
