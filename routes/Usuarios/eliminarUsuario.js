import express from 'express';
import Usuario from '../../models/Usuario/usuarioModel.js';
const router = express.Router();

// Ruta para obtener eliminar un usuario por su id_usuario.
router.delete('/:id', eliminarUsuario);

async function eliminarUsuario(req, res) {
  const { id } = req.params;

  try {
    const response = await Usuario.destroy({
      where: { id_usuario: id }
    });

    if (response != 1) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado para eliminar' });
    }

    return res.status(200).json({ mensaje: 'Usuario eliminado correctamente', response });
  } catch (error) {
    console.error('Error al eliminar el Usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }

}

export default router;