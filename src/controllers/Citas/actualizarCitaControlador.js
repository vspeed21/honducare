import Cita from '../../models/Cita/citaModel.js';

const actualizarcitaControlador = {

  actualizarCita: async (req, res) => {
    const { id_cita } = req.params;
    const { id_estado_cita, fecha, hora, motivo_cita } = req.body;

    console.log(req.body);

    try {
      const [numeroFilasActualizadas] = await Cita.update(
        {
          id_estado_cita,
          fecha,
          hora,
          motivo_cita,
        },
        {
          where: { id_cita },
        }
      );

      if (numeroFilasActualizadas === 0) {
        return res.status(404).json({ mensaje: "Cita no encontrada" });
      }

      return res.status(200).json({ mensaje: "Cita actualizada exitosamente" });
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  },

  cancelarCita: async (req, res) => {
    const { id_cita } = req.params;
    const { motivo_cancelacion } = req.body;

    const cita = await Cita.findAll({
      where: { id_cita }
    });

    if (!motivo_cancelacion || !id_cita) {
      res.status(400).json({ mensaje: 'Faltan datos requeridos (motivo y cita)' });
      return;
    }

    if (cita.length == 0) {
      res.status(404).json({ mensaje: 'La cita no existe' });
      return;
    }

    // Si es igual a 4 significa que ya paso su consulta, no se puede cancelar
    if (cita[0].id_estado_cita == 4) {
      res.status(400).json({ mensaje: 'La cita ya finalizo su consulta, no es posible cancelarla.' });
      return;
    }

    try {
      const [numeroFilasActualizadas] = await Cita.update(
        {
          id_estado_cita: 5,
          motivo_cancelacion,
        },
        {
          where: { id_cita },
        }
      );

      if (numeroFilasActualizadas === 0) {
        return res.status(404).json({ mensaje: "Cita no encontrada" });
      }

      return res.status(200).json({ mensaje: "Cita actualizada exitosamente" });
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
};
export default actualizarcitaControlador;
