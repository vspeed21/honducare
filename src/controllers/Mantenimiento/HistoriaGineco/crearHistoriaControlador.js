import DescripcionGinecobstretica from '../../../models/Mantenimiento/descripcion_ginecobstetrica_Model.js'; // Ajusta la ruta a tu modelo

const descripcionController = {
createDescripcionGinecobstretica : async (req, res) => {
  try {
    const { descripcion } = req.body;

    // Validación básica (puedes agregar más validaciones según tus necesidades)
    if (!descripcion) {
      return res.status(400).json({ message: "La descripción es requerida" });
    }

    const newDescripcion = await DescripcionGinecobstretica.create({
      descripcion,
    });

    res.status(200).json(newDescripcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la descripción" });
  }
}
};

export default descripcionController;
