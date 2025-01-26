import Sexo from '../../../models/Mantenimiento/sexoModel.js';

// Controlador para gestionar sexos
const sexoController = {
  // Obtener todos los sexos
  obtenerTodosLosSexos: async (req, res) => {
    try {
      const sexos = await Sexo.findAll();
      res.status(200).json(sexos);
    } catch (error) {
      console.error("Error al obtener los sexos:", error.message);
      res
        .status(500)
        .json({ error: "Error al obtener los sexos", details: error.message });
    }
  },

  // Obtener un sexo específico
  obtenerSexo: async (req, res) => {
    const { id_sexo } = req.params;

    try {
      const sexo = await Sexo.findByPk(id_sexo);

      if (sexo) {
        res.status(200).json(sexo);
      } else {
        res.status(404).json({ error: "Sexo no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el sexo:", error.message);
      res
        .status(500)
        .json({ error: "Error al obtener el sexo", details: error.message });
    }
  },
};

export default sexoController;
