const express = require('express');
const router = express.Router();
const { tipoDocumentoController } = require('../../../controllers/Mantenimiento/TipoDocumento/eliminarTipoDocuCntrolador');

// Ruta para eliminar un tipo de documento
router.delete('/:id', tipoDocumentoController.eliminarTipoDocumento);

module.exports = router;