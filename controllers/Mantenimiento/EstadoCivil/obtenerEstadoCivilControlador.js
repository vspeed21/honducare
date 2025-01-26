import EstadoCivil from '../../../models/Mantenimiento/estado_civilModel.js';

// Obtener todos los estados civiles
const estadoCivilController ={
 getAllEstadosCiviles : async (req, res) => {
  try {
    const estadosCiviles = await EstadoCivil.findAll();
    res.json(estadosCiviles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los estados civiles" });
  }
},

// Obtener un estado civil por ID
 getEstadoCivilById : async (req, res) => {
  try {
    const { id } = req.params;
    const estadoCivil = await EstadoCivil.findByPk(id);

    if (!estadoCivil) {
      return res.status(404).json({ message: "Estado civil no encontrado" });
    }

    res.json(estadoCivil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el estado civil" });
  }
}
};
export default estadoCivilController;
