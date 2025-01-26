import TipoDocumento from '../../../models/Mantenimiento/tipo_documentoModel.js'; // Ajusta la ruta si es necesario

// Controlador para gestionar tipos de documento
const tipoDocumentoController = {
  // Eliminar un tipo de documento
  eliminarTipoDocumento: async (req, res) => {
    const { id } = req.params;

    try {
      // Busca el tipo de documento por ID
      const tipoDocumentoEncontrado = await TipoDocumento.findByPk(id);

      if (!tipoDocumentoEncontrado) {
        return res
          .status(404)
          .json({ error: "Tipo de documento no encontrado" });
      }

      // Elimina el tipo de documento
      await tipoDocumentoEncontrado.destroy();

      res
        .status(200)
        .json({ message: "Tipo de documento eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar el tipo de documento:", error);
      res.status(500).json({ error: "Error al eliminar el tipo de documento" });
    }
  },
};

export default tipoDocumentoController;
