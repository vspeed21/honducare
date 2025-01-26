const express = require('express');
const router = express.Router();
const {tipoDocumentoController} = require('../../../Controllers/Mantenimiento/TipoDocumento/actualizarTipoDocuControlador');

// Ruta para actualizar un tipo de documento
router.put('/:id', tipoDocumentoController.actualizarTipoDocumento);

module.exports = router;