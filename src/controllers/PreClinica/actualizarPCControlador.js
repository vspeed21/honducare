import preclinica from '../../models/Cita/preclinicaModel.js';

// Controlador para actualizar una preclínica
const actualizarPCControlador = {
  actualizarPreclinica: async (req, res) => {
    const { id_paciente } = req.params; // Suponiendo que el ID de la preclínica se envía por la URL
    const { presion_arterial, frecuencia_cardiaca, frecuencia_respiratoria, temperatura, peso_actual, talla, glucometria } = req.body;

    try {
      // Actualizar los datos de la preclínica
      const pre = await preclinica.update({
        presion_arterial,
        frecuencia_cardiaca,
        frecuencia_respiratoria,
        temperatura,
        peso_actual,
        talla,
        glucometria,
      }, {
        where: { id_paciente }
      });

      const bitacoras = await Bitacora.findAll({
        order: [
          ['id_bitacora', 'ASC']
        ]
      });

      await Bitacora.create({
        id_bitacora: bitacoras[bitacoras.length - 1].id_bitacora + 1,
        id_usuario: req.user.usuario.id_usuario,
        fecha: new Date(),
        operacion: `Actualizo la preclinica `,
      });

      res.status(200).json({ message: 'Preclínica actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar la preclínica:', error.message);
      res.status(500).json({ error: 'Error al actualizar la preclínica', details: error.message });
    }
  }
};

export default actualizarPCControlador; //|