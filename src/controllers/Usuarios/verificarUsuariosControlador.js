import generateJWT from '../../helpers/generateJWT.js';
import Usuario from '../../models/Usuario/usuarioModel.js';

const verificarUsuario = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Usuario.findOne({ where: { correo_electronico: email } });
    if (!user) {
      return res.status(404).json({
        autenticated: false,
        message: "Usuario no encontrado en la base de datos.",
      });
    }

    const token = generateJWT(user);

    return res.status(200).json({
      autenticated: true,
      data: user,
      message: "Usuario encontrado.",
      token,
    });
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    return res.status(500).json({ message: "Error del servidor..." + error });
  }
};

export default verificarUsuario;
