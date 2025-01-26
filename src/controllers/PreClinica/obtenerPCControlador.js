import Preclinica from '../../models/Cita/preclinicaModel.js';
// Controlador para obtener una o todas las preclínicas de un paciente
const obtenerPreclinicaControlador = {
  obtenerPreclinica: async (req, res) => {
    const { id_paciente, id_cita } = req.query;

    try {
      if (id_paciente) {
        // Obtener todas las preclínicas de un paciente específico
        const preclinicas = await Preclinica.findAll({
          where: { id_paciente, id_cita },
        });

        if (preclinicas.length > 0) {
          res.status(200).json(preclinicas);
        } else {
          res
            .status(404)
            .json({ error: "No se encontraron preclínicas para este paciente" });
        }
      } else {
        // Obtener todas las preclínicas (si no se proporciona un ID de paciente)
        const preclinicas = await Preclinica.findAll();
        res.status(200).json(preclinicas);
      }
    } catch (error) {
      console.error("Error al obtener las preclínicas:", error.message);
      res
        .status(500)
        .json({
          error: "Error al obtener las preclínicas",
          details: error.message,
        });
    }
  }
};

export default obtenerPreclinicaControlador;
