const express = require('express');
const router = express.Router();
const { tipoDocumentoController } = require('../../../controllers/Mantenimiento/TipoDocumento/obtenerTipoDocuControlador');

// Ruta para obtener todos los tipos de documento
router.get('/tiposDocumentos', tipoDocumentoController.obtenerTodosLosTiposDocumento);

// Ruta para obtener un tipo de documento por ID
router.get('/:id', tipoDocumentoController.obtenerTipoDocumentoPorId);

module.exports = router;