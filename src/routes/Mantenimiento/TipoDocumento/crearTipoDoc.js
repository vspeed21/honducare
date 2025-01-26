const express = require('express');
const router = express.Router();
const {tipoDocumentoController} = require('../../../Controllers/Mantenimiento/TipoDocumento/crearTipoDocuControlador'); 

// Ruta para crear un nuevo tipo de documento
router.post('/', tipoDocumentoController.crearTipoDocumento);

module.exports = router;