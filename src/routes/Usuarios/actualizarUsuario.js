import express from 'express';
import Usuario from '../../models/Usuario/usuarioModel.js';
const router = express.Router();

import Bitacora from '../../models/Mantenimiento/BitacoraModel.js';

import checkAuth from '../../middleware/checkAuth.js';

// Ruta para para actualizar un usuario por el id_usuario.
router.put('/:id', checkAuth, actualizarUsuario);

async function actualizarUsuario(req, res) {
  const { id } = req.params;

  const { nombre, identidad, correo, rol_id, direccion, estado, id_especialidad } = req.body;

  // Validar que no se reciba campos vacios desde el front.
  if ([nombre.toString(), identidad.toString(), correo.toString(), rol_id.toString(), direccion.toString(), estado.toString()].includes('')) {
    res.json({ mensaje: 'Faltan campos obligatorios' });
    return;
  }

  try {
    const [numeroFilasActualizadas] = await Usuario.update(
      {
        nombre_de_usuario: nombre,
        numero_identidad: identidad,
        correo_electronico: correo,
        id_rol: rol_id,
        direccion1: direccion,
        estado,
        id_especialidad: id_especialidad ? id_especialidad : null,
      },
      {
        where: { id_usuario: id },
      }
    );

    if (numeroFilasActualizadas === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrada' });
    }

    const bitacoras = await Bitacora.findAll({
      order: [
        ['id_bitacora', 'ASC']
      ]
    });

    await Bitacora.create({
      id_bitacora: bitacoras[bitacoras.length - 1].id_bitacora + 1,
      id_usuario: req.user.usuario.id_usuario,
      fecha: new Date(),
      operacion: `Actualizo la informaciòn del usuario ${id} - ${nombre}`,
    });

    return res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el Usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

}

export default router;