const Paciente = import('../../models/Expediente/PacienteModel.js');
import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';




  const TipoDocumento = sequelize.define('tbl_tipo_documento', {
    id_documento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo_documento: DataTypes.STRING,
    numero_documento: DataTypes.STRING,
  }, { tableName: 'tbl_tipo_documento' });


  export default TipoDocumento;