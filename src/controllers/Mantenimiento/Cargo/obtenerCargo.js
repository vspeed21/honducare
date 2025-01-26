import Cargo from '../../../models/Mantenimiento/cargosModel.js'; // Ajusta la ruta a tu modelo

// Obtener todos los cargos
const getAllCargos = async (req, res) => {
  try {
    const cargos = await Cargo.findAll();
    res.json(cargos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los cargos" });
  }
};

// Obtener un cargo por ID
const getCargoById = async (req, res) => {
  try {
    const cargo = await Cargo.findByPk(req.params.id);
    if (!cargo) {
      return res.status(404).json({ message: "Cargo no encontrado" });
    }
    res.json(cargo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el cargo" });
  }
};

export { getAllCargos, getCargoById };
