import Cita from '../../models/Cita/citaModel.js';

import Bitacora from '../../models/Mantenimiento/BitacoraModel.js';

const crearcitacontrolador = {
  crearCita: async (req, res) => {
    const {
      id_paciente,
      id_estado_cita,
      fecha,
      hora,
      motivo_cita,
      id_usuario,
      nombre,
      telefono,
      numero_identidad,
    } = req.body;

    const DURACION_PROMEDIO_CITA = 60 * 60 * 1000; // 1 hora en milisegundos

    const selectedDate = new Date(fecha);
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setHours(currentDate.getHours() - 6);

    // Validación de campos obligatorios
    if (!id_estado_cita || !fecha || !hora || !motivo_cita || !telefono) {
      return res.status(400).json({ mensaje: "Faltan datos requeridos" });
    }

    // Validar que la cita no se haya pasado de la fecha, una cita establecida para el 3/12 no puede atenderse el 4/12 a menos que se reprograme primero.
    if (selectedDate < currentDate) {
      res.status(400).json({ selectedDate, currentDate, mensaje: `La fecha de registro de la cita (${fecha}) no puede ser menor a la fecha actual` });
      return;
    }

    const citasDoctor = await Cita.findAll({
      where: { id_estado_cita: 1, id_usuario, fecha }
    });

    // Fecha y hora de la cita a agendar - Enviada desde el front
    const dateTimeCitaBody = new Date(`${fecha} ${hora}`).getTime(); // Fecha y hora de la nueva cita
    const dateTimeFinCitaBody = dateTimeCitaBody + DURACION_PROMEDIO_CITA; // Fin de la nueva cita

    // Validar que no se junten citas al doctor en un mismo horario.
    const conflicto = citasDoctor.some(cita => {
      const dateTimeInicio = new Date(`${cita.fecha} ${cita.hora}`).getTime();
      const dateTimeFin = dateTimeInicio + DURACION_PROMEDIO_CITA;

      // Verificar si la nueva cita cae dentro de un rango ocupado
      return (
        (dateTimeCitaBody >= dateTimeInicio && dateTimeCitaBody < dateTimeFin) || // Comienza dentro de una cita existente
        (dateTimeFinCitaBody > dateTimeInicio && dateTimeFinCitaBody <= dateTimeFin) || // Termina dentro de una cita existente
        (dateTimeCitaBody <= dateTimeInicio && dateTimeFinCitaBody >= dateTimeFin)
      );
    });

    if (conflicto) {
      return res.status(400).json({ mensaje: "El doctor ya tiene una cita en este horario. Seleccione una fecha y hora diferente" });
    }

    // No hay conflictos, creara la cita.

    try {
      // Crear la cita en tbl_citas
      const nuevaCita = await Cita.create({
        id_paciente: id_paciente,
        id_estado_cita: id_estado_cita || 1,
        id_usuario,
        fecha,
        hora,
        motivo_cita,
      });

      const bitacoras = await Bitacora.findAll({
        order: [
          ['id_bitacora', 'ASC']
        ]
      });

      await Bitacora.create({
        id_bitacora: bitacoras.length > 0 ? bitacoras[bitacoras.length - 1].id_bitacora + 1 : 1,
        id_usuario: req.user.usuario.id_usuario,
        fecha: new Date(),
        operacion: `Creo la cita con el id ${nuevaCita.id_cita} al paciente ${nuevaCita.id_paciente}`,
      });

      res
        .status(201)
        .json({ message: "Cita creada exitosamente", data: nuevaCita });
    } catch (error) {
      console.error("Error al crear la cita:", error);
      res.status(500).json({ mensaje: "Error al crear la cita", details: error });
    }
  }
};

export default crearcitacontrolador;
