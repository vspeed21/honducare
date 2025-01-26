import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sequelize.config.js';

  const EstadoCivil = sequelize.define('tbl_estado_civil', {
    id_estado_civil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: DataTypes.STRING
  }, { tableName: 'tbl_estado_civil' });
  
  export default EstadoCivil;