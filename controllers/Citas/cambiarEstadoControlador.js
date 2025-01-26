import { Op } from 'sequelize';

import Cita from '../../models/Cita/citaModel.js';

async function cambiarEstadoNoPresentado(req, res) {
  const { id_cita } = req.params; // Obtén el ID de la cita del request

  try {
    // Actualiza el estado de la cita a "No Presentado"
    const resultado = await Cita.update(
      { estado: "No Presentado" }, // Cambia a tu estado deseado
      {
        where: {
          id_cita: {
            [Op.eq]: id_cita, // Usa el operador de igualdad
          },
        },
      }
    );

    if (resultado[0] === 0) {
      return res
        .status(404)
        .json({ mensaje: "Cita no encontrada o estado ya actualizado" });
    }

    return res.json({ mensaje: "Estado de cita actualizado correctamente" });
  } catch (error) {
    console.error("Error al cambiar el estado de citas:", error);
    return res
      .status(500)
      .json({ mensaje: "Error al cambiar el estado de la cita" });
  }
}

export default cambiarEstadoNoPresentado;
