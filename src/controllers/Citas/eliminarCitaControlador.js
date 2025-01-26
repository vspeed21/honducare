import Cita from '../../models/Cita/citaModel.js';

const eliminarcitaControlador = {
eliminarCita : async (req, res) => {
  const { id_cita } = req.params;

  try {
    const resultado = await Cita.destroy({
      where: { id_cita },
    });

    if (resultado === 0) {
      return res.status(404).json({ mensaje: "Cita no encontrada" });
    }

    return res.status(200).json({ mensaje: "Cita eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}
};

export default eliminarcitaControlador;
