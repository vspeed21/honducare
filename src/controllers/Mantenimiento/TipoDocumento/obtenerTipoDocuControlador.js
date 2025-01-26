import TipoDocumento from '../../../models/Mantenimiento/tipo_documentoModel.js'; // Ajusta la ruta si es necesario

// Controlador para gestionar tipos de documento
const tipoDocumentoController = {
  // Obtener todos los tipos de documento
  obtenerTodosLosTiposDocumento: async (req, res) => {
    try {
      const todosLosTiposDocumentos = await TipoDocumento.findAll();
      res.json(todosLosTiposDocumentos);
    } catch (error) {
      console.error("Error al obtener los tipos de documento:", error);
      res
        .status(500)
        .json({ error: "Error al obtener los tipos de documento" });
    }
  },

  // Obtener un tipo de documento por ID
  obtenerTipoDocumentoPorId: async (req, res) => {
    const { id } = req.params;

    try {
      const tipoDocumentoEncontrado = await TipoDocumento.findByPk(id);

      if (!tipoDocumentoEncontrado) {
        return res
          .status(404)
          .json({ error: "Tipo de documento no encontrado" });
      }

      res.json(tipoDocumentoEncontrado);
    } catch (error) {
      console.error("Error al obtener el tipo de documento:", error);
      res.status(500).json({ error: "Error al obtener el tipo de documento" });
    }
  },
};

export default tipoDocumentoController;
