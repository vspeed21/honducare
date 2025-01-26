
import Bitacora from "../../../models/Mantenimiento/BitacoraModel.js";
import Sexo from "../../../models/Mantenimiento/sexoModel.js";
import Rol from "../../../models/Seguridad/rolesModel.js";
import Usuario from "../../../models/Usuario/usuarioModel.js";

export async function getBitacora(req, res) {
  try {
    const bitacoras = await Bitacora.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nombre_de_usuario', 'id_rol'], // Ajusta según las columnas de tu tabla EstadoCivil
          include: [
            {
              model: Rol,
              as: 'rol',
              attributes: ['id_rol', 'rol'],
            }
          ],
        },
      ],
      order: [
        ['fecha', 'DESC'],
        ['id_bitacora', 'ASC']
      ],
    });
    res.status(200).json(bitacoras);
  } catch (error) {
    console.error('Error al obtener la bitacora:', error);
    res.status(500).json({ error: 'Error al obtener la bitacora', details: error });
  }
};
