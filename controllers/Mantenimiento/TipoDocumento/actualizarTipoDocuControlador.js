import TipoDocumento from '../../../models/Mantenimiento/tipo_documentoModel.js'; // Ajusta la ruta si es necesario

// Controlador para gestionar tipos de documento
const tipoDocumentoController = {
  // Actualizar un tipo de documento
  actualizarTipoDocumento: async (req, res) => {
    const { id } = req.params; // Obtiene el ID del tipo de documento a actualizar
    const { tipo_documento, numero_documento } = req.body;

    try {
      // Busca el tipo de documento por ID
      const tipoDocumentoEncontrado = await TipoDocumento.findByPk(id);

      if (!tipoDocumentoEncontrado) {
        return res
          .status(404)
          .json({ error: "Tipo de documento no encontrado" });
      }

      // Actualiza los datos
      await tipoDocumentoEncontrado.update({
        tipo_documento,
        numero_documento,
      });

      res
        .status(200)
        .json({
          message: "Tipo de documento actualizado exitosamente",
          data: tipoDocumentoEncontrado,
        });
    } catch (error) {
      console.error("Error al actualizar el tipo de documento:", error.message);
      res
        .status(500)
        .json({
          error: "Error al actualizar el tipo de documento",
          details: error.message,
        });
    }
  },
};

export default tipoDocumentoController;
