import Cita from '../../models/Cita/citaModel.js';
import Preclinica from '../../models/Cita/preclinicaModel.js';

import Bitacora from '../../models/Mantenimiento/BitacoraModel.js';

// Controlador para crear una nueva preclínica
const crearPCControlador = {
  crearPreclinica: async (req, res) => {
    const {
      id_cita,
      id_paciente,
      presion_arterial,
      frecuencia_cardiaca,
      frecuencia_respiratoria,
      temperatura,
      peso_actual,
      talla,
      glucometria
    } = req.body;

    try {
      // Crear una nueva preclínica
      const nuevaPreclinica = await Preclinica.create({
        id_cita,
        id_paciente,
        presion_arterial,
        frecuencia_cardiaca,
        frecuencia_respiratoria,
        temperatura,
        peso_actual,
        talla,
        glucometria,
      });

      await Cita.update(
        {
          id_estado_cita: 3,
        },
        {
          where: { id_cita }
        }
      );

      const bitacoras = await Bitacora.findAll({
        order: [
          ['id_bitacora', 'ASC']
        ]
      });

      await Bitacora.create({
        id_bitacora: bitacoras[bitacoras.length - 1].id_bitacora + 1,
        id_usuario: req.user.usuario.id_usuario,
        fecha: new Date(),
        operacion: `Registro la preclinica ${nuevaPreclinica.id_preclinica} a la cita ${id_cita} al paciente con id: ${id_paciente}`,
      });

      res
        .status(201)
        .json({
          message: "Preclínica creada exitosamente",
          data: nuevaPreclinica,
        });
    } catch (error) {
      console.error("Error al crear la preclínica:", error.message);
      res
        .status(500)
        .json({ error: "Error al crear la preclínica", details: error.message });
    }
  }
};

export default crearPCControlador; //
