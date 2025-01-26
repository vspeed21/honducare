import DescripcionHabitos from '../../../models/Mantenimiento/descripcion_habitos_Model.js'; // Ajusta la ruta a tu modelo

const HTController = {
createDescripcionHabitos : async (req, res) => {
  try {
    const { descripcion } = req.body;

    if (!descripcion) {
      return res.status(400).json({ message: "La descripción es requerida" });
    }

    const newDescripcionHabitos = await DescripcionHabitos.create({
      descripcion,
    });

    res.status(200).json(newDescripcionHabitos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear la descripción de hábitos" });
  }
}
};

export default HTController;
