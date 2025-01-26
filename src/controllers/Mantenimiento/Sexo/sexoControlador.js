// sexoControlador.js
import Sexo from '../../../models/Mantenimiento/sexoModel.js'; 
// Crear una nueva opción de sexo
const sexoControlador = {
crearSexo : async (req, res) => {
  const { descripcion } = req.body;

  try {
    const nuevoSexo = await Sexo.create({ descripcion });
    res.status(200).json({ message: "Sexo creado exitosamente", nuevoSexo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el sexo" });
  }
}
};

export default sexoControlador;
