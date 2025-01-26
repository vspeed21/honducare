import TipoDocumento from '../../../models/Mantenimiento/tipo_documentoModel.js';

// Controlador para gestionar tipos de documento
const tipoDocumentoController = {
  // Crear un nuevo tipo de documento
  crearTipoDocumento: async (req, res) => {
    const { tipo_documento, numero_documento } = req.body;

    try {
      const nuevoTipoDocumento = await TipoDocumento.create({
        tipo_documento,
        numero_documento,
      });

      res
        .status(200)
        .json({
          message: "Tipo de documento creado exitosamente",
          data: nuevoTipoDocumento,
        });
    } catch (error) {
      console.error("Error al crear el tipo de documento:", error.message);
      res
        .status(500)
        .json({
          error: "Error al crear el tipo de documento",
          details: error.message,
        });
    }
  },
};

export default tipoDocumentoController;
