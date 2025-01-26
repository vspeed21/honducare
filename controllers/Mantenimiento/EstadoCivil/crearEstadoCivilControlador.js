import EstadoCivil from '../../../models/Mantenimiento/estado_civilModel.js'; // Ajusta la ruta a tu modelo

const createEstadoCivil = async (req, res) => {
  try {
    const { descripcion } = req.body;

    // Validación básica (puedes agregar más validaciones según tus necesidades)
    if (!descripcion) {
      return res.status(400).json({ message: "La descripción es requerida" });
    }

    const newEstadoCivil = await EstadoCivil.create({ descripcion });
    console.log(newEstadoCivil);
    res.status(200).json(newEstadoCivil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el estado civil" });
  }
};

export default createEstadoCivil;
