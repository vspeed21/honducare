import DescripcionGinecobstretica from '../../../models/Mantenimiento/descripcion_ginecobstetrica_Model.js';

// Obtener todas las descripciones
const descripcionController = {
getAllDescripciones : async (req, res) => {
  try {
    const descripciones = await DescripcionGinecobstretica.findAll();
    res.json(descripciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las descripciones" });
  }
},

// Obtener una descripción por ID
getDescripcionById : async (req, res) => {
  try {
    const { id } = req.params;
    const descripcion = await DescripcionGinecobstretica.findByPk(id);

    if (!descripcion) {
      return res.status(404).json({ message: "Descripción no encontrada" });
    }

    res.json(descripcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la descripción" });
  }
}
};

export default descripcionController;
