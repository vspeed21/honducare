import Especialidades from '../../../models/Mantenimiento/EspecialidadesModel.js';

import Bitacora from '../../../models/Mantenimiento/BitacoraModel.js'

export async function createEspecialidad(req, res) {
  const { nombre } = req.body;

  try {
    // Crear especialidad
    const nuevaEspecialidad = await Especialidades.create({
      nombre,
    });

    const bitacoras = await Bitacora.findAll();

    await Bitacora.create({
      id_bitacora: bitacoras[bitacoras.length - 1].id_bitacora + 1,
      id_usuario: req.user.usuario.id_usuario,
      fecha: new Date(),
      operacion: `Creo la especialidad ${nombre} con el id ${nuevaEspecialidad.id_especialidad}`,
    });

    res
      .status(200)
      .json({ message: "Especialidad creada exitosamente", data: nuevaEspecialidad });
  } catch (error) {
    console.error("Error al crear la especialidad:", error);
    res.status(500).json({ mensaje: "Error al crear la especialidad", details: error });
  }
}

export async function getEspecialidades(req, res) {

  try {
    const especialidades = await Especialidades.findAll();

    res
      .status(200)
      .json({ message: "Citas obtenidas correctamente", especialidades });
  } catch (error) {
    console.error("Error al obtener la especialidades", error);
    res.status(500).json({ mensaje: "Error al obtener las especialidades", details: error });
  }
}

export async function getEspecialidadById(req, res) {
  const { id } = req.params;

  try {
    const especialidades = await Especialidades.findOne({
      where: {
        id_especialidad: id,
      },
    });

    if (!especialidades) {
      res.status(404).json({ message: 'No se encontro la cita con el id especificado' });
      return;
    }

    res
      .status(200)
      .json({ message: "Especialidad obtenidas correctamente", especialidades });
  } catch (error) {
    console.error("Error al obtener la Especialidad", error);
    res.status(500).json({ mensaje: "Error al obtener las Especialidad", details: error });
  }
}

export async function updateEspecialidad(req, res) {
  const { nombre } = req.body;

  const { id } = req.params;

  try {
    await Especialidades.update({
      nombre,
    }, {
      where: {
        id_especialidad: id
      }
    });

    const bitacoras = await Bitacora.findAll();

    await Bitacora.create({
      id_bitacora: bitacoras[bitacoras.length - 1].id_bitacora + 1,
      id_usuario: req.user.usuario.id_usuario,
      fecha: new Date(),
      operacion: `Actualizo la especialidad con el id: ${id}`,
    });

    res
      .status(200)
      .json({ message: "Especialidad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la especialidad:", error);
    res.status(500).json({ mensaje: "Error al actualizar la especialidad", details: error });
  }
}
