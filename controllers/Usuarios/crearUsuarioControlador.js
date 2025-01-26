import Usuario from '../../models/Usuario/usuarioModel.js';
import { auth } from '../../FirebaseConfig.js';
import { encriptarContrasena } from '../../helpers/PasswordHash.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Bitacora from '../../models/Mantenimiento/BitacoraModel.js';

// Función para crear un nuevo usuario
const crearUsuario = async (req, res) => {
  console.log("Modelo Usuario:", Usuario);

  const {
    numero_identidad,
    direccion1,
    nombre_de_usuario,
    contrasena,
    id_rol,
    estado,
    correo_electronico,
    fecha_ultima_conexion,
    fecha_vencimiento,
    id_especialidad,
  } = req.body;

  console.log("Iniciando creación de usuario...");
  console.log("Datos recibidos:", req.body);

  try {
    // Encriptar la contraseña
    console.log("Encriptando contraseña...");
    const contrasenaEncriptada = await encriptarContrasena(contrasena);
    console.log("Contraseña encriptada:", contrasenaEncriptada);

    // Crear usuario en Firebase Authentication
    console.log("Registrando usuario en Firebase...");
    const firebaseUser = await createUserWithEmailAndPassword(
      auth,
      correo_electronico,
      contrasena
    );
    const firebase_uid = firebaseUser.user.uid; // Obtener UID generado por Firebase
    console.log("Usuario registrado en Firebase. UID:", firebase_uid);

    // Crear usuario en la base de datos
    console.log("Creando usuario en la base de datos local...");
    const nuevoUser = await Usuario.create({
      numero_identidad,
      direccion1,
      nombre_de_usuario,
      contrasena: contrasenaEncriptada,
      id_rol,
      estado,
      correo_electronico,
      fecha_ultima_conexion,
      fecha_vencimiento,
      firebase_uid,
      id_especialidad,
    });

    console.log("Usuario creado en la base de datos:", nuevoUser);

    const bitacoras = await Bitacora.findAll({
      order: [
        ['id_bitacora', 'ASC']
      ]
    });

    await Bitacora.create({
      id_bitacora: bitacoras.length > 0 ? bitacoras[bitacoras.length - 1].id_bitacora + 1 : 1,
      id_usuario: req.user.usuario.id_usuario,
      fecha: new Date(),
      operacion: `Creo el usuario con id ${nuevoUser.id_usuario}`,
    });

    // Respuesta al cliente
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", data: nuevoUser });
  } catch (error) {
    console.error("Error durante la creación del usuario:", error);

    // Manejo de errores para Firebase o base de datos
    if (error.code && error.code.startsWith("auth/")) {
      console.log("Error en Firebase Authentication:", error.message);
      return res
        .status(400)
        .json({
          error: "Error en Firebase Authentication",
          details: error.message,
        });
    }

    res
      .status(500)
      .json({ error: "Error al crear el usuario", details: error.message });
  }
};

export default crearUsuario;
