const express = require('express');
const router = express.Router();
const { tipoDocumentoController } = require('../../../controllers/Mantenimiento/TipoDocumento/crearTipoDocuControlador');

// Ruta para crear un nuevo tipo de documento
router.post('/', tipoDocumentoController.crearTipoDocumento);

module.exports = router;